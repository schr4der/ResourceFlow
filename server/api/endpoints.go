package api

import (
	"database/sql"
	"net/http"
	"resourceflow/model"
	"resourceflow/process"

	"github.com/gin-gonic/gin"
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

func AddItem(db *sql.DB) func(c *gin.Context) {
  return func(c *gin.Context) {
    var items []model.Item

    err := c.ShouldBindJSON(&items)
    if err != nil {
      c.Status(http.StatusBadRequest)
    }
    
    addErr := process.AddItems(db, items)
    if addErr != nil {
      c.Status(http.StatusInternalServerError)
    }

    c.Status(http.StatusOK)
  }
}
