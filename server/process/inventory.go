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
  sqlTempl:= "INSERT INTO inventory (name, description, quantity) VALUES ('{{.Name}}', '{{.Description}}', {{.Quantity}});"
  t, err := template.New("sqlQuery").Parse(sqlTempl)
  if err != nil {
    return err
  }
  
  for _, item := range(items) {
    var sqlQuery strings.Builder
    err = t.Execute(&sqlQuery, item)
    if err != nil {
      return err
    }
    db.Exec(sqlQuery.String())
  }

  return nil
}
