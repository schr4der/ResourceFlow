package process

import (
	"database/sql"
	"fmt"
	"resourceflow/model"
)

func Match(db *sql.DB) ([]model.Match, error) {
	var matches []model.Match

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
          requester.PersonID,
          donator.PersonID,
          donator.ItemID,
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
