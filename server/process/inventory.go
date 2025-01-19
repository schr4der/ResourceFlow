package process

import (
	"database/sql"
	"fmt"
	"log"
	"resourceflow/model"
	"strings"
	"text/template"
)

func GetItems(db *sql.DB, query string) []model.Item {
	sqlQuery := "SELECT * FROM inventory;"

	rows, err := db.Query(sqlQuery)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil
	}

	defer rows.Close()

	var items []model.Item

	for rows.Next() {
		var item model.Item
		err := rows.Scan(&item.Id, &item.Name, &item.Description, &item.Quantity)
		if err != nil {
			log.Printf("Error scanning row: %v\n", err)
			continue
		}
		items = append(items, item)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Error iterating rows: %v\n", err)
	}
	return items
}

func AddItems(db *sql.DB, items []model.Item) error {
	sqlTempl := "INSERT INTO inventory (name, description, quantity) VALUES ('{{.Name}}', '{{.Description}}', {{.Quantity}});"
	t, err := template.New("sqlQuery").Parse(sqlTempl)
	if err != nil {
		return err
	}

	for _, item := range items {
		var sqlQuery strings.Builder
		err = t.Execute(&sqlQuery, item)
		if err != nil {
			return err
		}
		_, err := db.Exec(sqlQuery.String())
		if err != nil {
			return err
		}
	}

	return nil
}

func RequestItems(db *sql.DB, selectedItems []model.SelectItem) error {
	sqlTempl := "INSERT INTO requester (person_id, item_id, quantity) VALUES ({{.PersonID}}, {{.ItemID}}, {{.Quantity}});"
	t, err := template.New("sqlQuery").Parse(sqlTempl)
	if err != nil {
		return err
	}

	for _, selectedItem := range selectedItems {
		var sqlQuery strings.Builder
		err = t.Execute(&sqlQuery, selectedItem)
		if err != nil {
			return err
		}
		_, err := db.Exec(sqlQuery.String())
		if err != nil {
			return err
		}
	}

	return nil
}

func DonateItems(db *sql.DB, selectedItems []model.SelectItem) error {
	sqlTempl := "INSERT INTO donator (person_id, item_id, quantity) VALUES ({{.PersonID}}, {{.ItemID}}, {{.Quantity}});"
	t, err := template.New("sqlQuery").Parse(sqlTempl)
	if err != nil {
		return err
	}

	for _, selectedItem := range selectedItems {
		var sqlQuery strings.Builder
		err = t.Execute(&sqlQuery, selectedItem)
		if err != nil {
			return err
		}
		_, err := db.Exec(sqlQuery.String())
		if err != nil {
			return err
		}
	}

	return nil
}

func DonatedItems(db *sql.DB) ([]model.SelectItemNames, error) {
	var donatedItems []model.SelectItemNames

	var people []model.Person
	peopleRows, err := db.Query("SELECT id, name, email, location FROM people;")
	if err != nil {
		return donatedItems, err
	}
	for peopleRows.Next() {
		var person model.Person
		err := peopleRows.Scan(&person.ID, &person.Name, &person.Email, &person.Location)
		if err != nil {
			return donatedItems, err
		}
		people = append(people, person)
	}

	var items []model.Item
	itemRows, err := db.Query("SELECT id, name, description, quantity FROM inventory;")
	if err != nil {
		return donatedItems, err
	}
	for itemRows.Next() {
		var item model.Item
		err := itemRows.Scan(&item.Id, &item.Name, &item.Description, &item.Quantity)
		if err != nil {
			return donatedItems, err
		}
		items = append(items, item)
	}

	var donaters []model.SelectItem
	donateRows, err := db.Query("SELECT person_id, item_id, quantity FROM donator;")
	if err != nil {
		return donatedItems, err
	}
	for donateRows.Next() {
		var donater model.SelectItem
		err := donateRows.Scan(&donater.PersonID, &donater.ItemID, &donater.Quantity)
		if err != nil {
			return donatedItems, err
		}
		donaters = append(donaters, donater)
	}

	for _, selectItem := range donaters {
		donatedItems = append(donatedItems, model.SelectItemNames{
			PersonName: people[selectItem.PersonID-1].Name,
			ItemName:   items[selectItem.ItemID-1].Name,
			Quantity:   selectItem.Quantity, // Assuming this is part of the model.SelectItem
		})
	}

	return donatedItems, nil
}

func RequestedItems(db *sql.DB) ([]model.SelectItemNames, error) {
	var requestedItems []model.SelectItemNames

	var people []model.Person
	peopleRows, err := db.Query("SELECT id, name, email, location FROM people;")
	if err != nil {
		return requestedItems, err
	}
	for peopleRows.Next() {
		var person model.Person
		err := peopleRows.Scan(&person.ID, &person.Name, &person.Email, &person.Location)
		if err != nil {
			return requestedItems, err
		}
		people = append(people, person)
	}

	var items []model.Item
	itemRows, err := db.Query("SELECT id, name, description, quantity FROM inventory;")
	if err != nil {
		return requestedItems, err
	}
	for itemRows.Next() {
		var item model.Item
		err := itemRows.Scan(&item.Id, &item.Name, &item.Description, &item.Quantity)
		if err != nil {
			return requestedItems, err
		}
		items = append(items, item)
	}

	var requesters []model.SelectItem
	requestRows, err := db.Query("SELECT person_id, item_id, quantity FROM requester;")
	if err != nil {
		return requestedItems, err
	}
	for requestRows.Next() {
		var requester model.SelectItem
		err := requestRows.Scan(&requester.PersonID, &requester.ItemID, &requester.Quantity)
		if err != nil {
			return requestedItems, err
		}
		requesters = append(requesters, requester)
	}

	for _, selectItem := range requesters {
		// Validate indices before accessing slices
		if selectItem.PersonID <= 0 || selectItem.PersonID > len(people) {
			continue
		}
		if selectItem.ItemID <= 0 || selectItem.ItemID > len(items) {
			continue
		}

		requestedItems = append(requestedItems, model.SelectItemNames{
			PersonName: people[selectItem.PersonID-1].Name,
			ItemName:   items[selectItem.ItemID-1].Name,
			Quantity:   selectItem.Quantity, // Assuming this is part of the model.SelectItem
		})
	}

	return requestedItems, nil
}
