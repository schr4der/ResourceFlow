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
	fmt.Println(selectedItems)
	sqlTempl := "INSERT INTO donator (person_id, item_id, quantity) VALUES ({{.PersonID}}, {{.ItemID}}, {{.Quantity}});"
	t, err := template.New("sqlQuery").Parse(sqlTempl)
	if err != nil {
		return err
	}

	for _, selectedItem := range selectedItems {
		var sqlQuery strings.Builder
		err = t.Execute(&sqlQuery, selectedItem)
		fmt.Println(sqlQuery.String())
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

func DonatedItems(db *sql.DB) ([]model.Item, error) {
  var items []model.Item
	itemRows, err := db.Query("SELECT id, name, description FROM inventory;")
	if err != nil {
		return items, err
	}
	for itemRows.Next() {
		var item model.Item 
		err := itemRows.Scan(&item.Id, &item.Name, &item.Description)
		if err != nil {
			return items, err
		}
		items = append(items, item)
	}

	var donaters []model.SelectItem
	donateRows, err := db.Query("SELECT person_id, item_id, quantity FROM donator;")
	if err != nil {
		return items, err
	}
	for donateRows.Next() {
		var donater model.SelectItem
		err := donateRows.Scan(&donater.PersonID, &donater.ItemID, &donater.Quantity)
		if err != nil {
			return items, err
		}
		donaters = append(donaters, donater)
	}
  
  var donatedItems []model.Item
  for _, selectItem := range(donaters) {
    donatedItems = append(donatedItems, items[selectItem.ItemID])
  }
  

  return donatedItems, nil
}

func RequestedItems(db *sql.DB) ([]model.Item, error) {
  var items []model.Item
	itemRows, err := db.Query("SELECT id, name, description FROM inventory;")
	if err != nil {
		return items, err
	}
	for itemRows.Next() {
		var item model.Item 
		err := itemRows.Scan(&item.Id, &item.Name, &item.Description)
		if err != nil {
			return items, err
		}
		items = append(items, item)
	}

	var requesters []model.SelectItem
	requestRows, err := db.Query("SELECT person_id, item_id, quantity FROM requester;")
	if err != nil {
		return items, err
	}
	for requestRows.Next() {
		var requester model.SelectItem
		err := requestRows.Scan(&requester.PersonID, &requester.ItemID, &requester.Quantity)
		if err != nil {
			return items, err
		}
		requesters = append(requesters, requester)
	}
  
  var requestedItems []model.Item
  for _, selectItem := range(requesters) {
    requestedItems = append(requestedItems, items[selectItem.ItemID])
  }
  

  return requestedItems, nil
}

