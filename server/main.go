package main

import (
	"github.com/gin-gonic/gin"
  "resourceflow/api"
)

func main() {
	// Setup Routes
	router := gin.Default()
	router.GET("/", api.Health)
  router.GET("/inventory", api.GetInventory)

	router.Run(":8080")
}
