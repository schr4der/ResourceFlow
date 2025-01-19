package main

import (
	"database/sql"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"os"
	"resourceflow/api"
)

var dbFile = os.Getenv("DATABASE_FILE")

func main() {
	// Connect to the database
	db, err := sql.Open("sqlite3", "db/example.db")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	// Setup Routes
	router := gin.Default()
	router.Use(cors.Default()) // This will allow all origins, you can customize it if needed
	router.GET("/", api.Health)
	router.GET("/inventory", api.GetInventory(db))
	router.POST("/add-items", api.AddItem(db))
  router.POST("/donate-items", api.DonateItem(db))
  router.POST("/request-items", api.RequestItem(db))

	router.Run(":8080")
}
