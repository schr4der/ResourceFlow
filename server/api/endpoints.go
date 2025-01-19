package api

import (
	"github.com/gin-gonic/gin"
  "database/sql"
	"net/http"
  "resourceflow/process"
)

func Health(c *gin.Context) {
	c.Status(http.StatusOK)
}

func GetInventory(db *sql.DB) func(c *gin.Context) {
  return func(c *gin.Context) {
    query := c.Param("query")
    items := process.GetItems(db, query) 

	if items == nil { // if not items found
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch inventory"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"items": items})
  }
}

func AddInventory(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {

	}
}