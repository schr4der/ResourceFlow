package main

import (
	"github.com/gin-gonic/gin"
  "resourceflow/api"
  "database/sql"
  "os"
  _ "github.com/mattn/go-sqlite3" 

)

var dbFile = os.Getenv("DATABASE_FILE")

func main() {
	// Connect to the database
	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		panic(err)
	}

	defer db.Close()
	// Setup Routes
	router := gin.Default()
	router.GET("/", api.Health)
	router.GET("/inventory", api.GetInventory(db))

	router.Run(":8080")
}
