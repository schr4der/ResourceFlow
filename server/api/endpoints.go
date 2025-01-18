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
    process.GetItems(db, query)
  }
}
