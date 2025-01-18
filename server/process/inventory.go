package process

import (
	"database/sql"
	"resourceflow/model"
)

func GetItems(db *sql.DB, query string) []model.Item {
	var items []model.Item

	return items
}

func AddItems(db *sql.DB, items []model.Item) {

}
