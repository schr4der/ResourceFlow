package process

import (
	"database/sql"
	"fmt"
	"resourceflow/model"
)

func Match(db *sql.DB) ([]model.Match, error) {
	var matches []model.Match

  var items []model.Item
	itemRows, err := db.Query("SELECT id, name, description FROM inventory;")
	if err != nil {
		return matches, err
	}
	for itemRows.Next() {
		var item model.Item 
		err := itemRows.Scan(&item.Id, &item.Name, &item.Description)
		if err != nil {
			return matches, err
		}
		items = append(items, item)
	}

  var people []model.Person
	peopleRows, err := db.Query("SELECT id, name, email, location FROM people;")
	if err != nil {
		return matches, err
	}
	for peopleRows.Next() {
		var person model.Person
		err := peopleRows.Scan(&person.ID, &person.Name, &person.Email, &person.Location)
		if err != nil {
			return matches, err
		}
		people = append(people, person)
	}

	var requesters []model.SelectItem
	requestRows, err := db.Query("SELECT person_id, item_id, quantity FROM requester;")
	if err != nil {
		return matches, err
	}
	for requestRows.Next() {
		var requester model.SelectItem
		err := requestRows.Scan(&requester.PersonID, &requester.ItemID, &requester.Quantity)
		if err != nil {
			return matches, err
		}
		requesters = append(requesters, requester)
	}

	var donators []model.SelectItem
	donatorRows, err := db.Query("SELECT person_id, item_id, quantity FROM donator;")
	if err != nil {
		return matches, err
	}
	for donatorRows.Next() {
		var donator model.SelectItem
		err := donatorRows.Scan(&donator.PersonID, &donator.ItemID, &donator.Quantity)
		if err != nil {
			return matches, err
		}
		donators = append(donators, donator)
	}

  for i, requester := range(requesters) {
    for j, donator := range(donators) {
      if requester.ItemID == donator.ItemID {
        matchedAmount := min(donator.Quantity, requester.Quantity)
        matches = append(matches, model.Match{
          people[requester.PersonID - 1].Name,
          people[donator.PersonID - 1].Name,
          items[donator.ItemID - 1].Name,
          matchedAmount,
        })
        donators[j].Quantity = donators[j].Quantity - matchedAmount 
        requesters[i].Quantity = requesters[i].Quantity - matchedAmount 
      }
    }
  }

  fmt.Println(matches)

	return matches, nil
}
