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

	fmt.Println(requesters)

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
	fmt.Println(donators)

	return matches, nil
}
