package process

import (
	"database/sql"
	"log"
	"resourceflow/model"
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

func AddItems(db *sql.DB, items []model.Item) {
	
}
