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
      return 
		}

		addErr := process.AddItems(db, items)
		if addErr != nil {
			c.Status(http.StatusInternalServerError)
      return 
		}

		c.Status(http.StatusCreated)
	}
}

func DonateItem(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var selectedItems []model.SelectItem

		err := c.ShouldBindJSON(&selectedItems)
		if err != nil {
			c.Status(http.StatusBadRequest)
      return 
		}

		addErr := process.DonateItems(db, selectedItems)
		if addErr != nil {
			c.Status(http.StatusInternalServerError)
      return 
		}

		c.Status(http.StatusCreated)
	}
}

func RequestItem(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var selectedItems []model.SelectItem

		err := c.ShouldBindJSON(&selectedItems)
		if err != nil {
			c.Status(http.StatusBadRequest)
      return 
		}

		addErr := process.RequestItems(db, selectedItems)
		if addErr != nil {
			c.Status(http.StatusInternalServerError)
      return 
		}

		c.Status(http.StatusCreated)
	}
}

func Match(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
    matches, err := process.Match(db)
    if err != nil {
      c.Status(http.StatusInternalServerError)
      return 
    }
		c.JSON(http.StatusOK, matches)
	}
}

func DonatedItems(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
    items, err := process.DonatedItems(db)
    if err != nil {
      c.Status(http.StatusInternalServerError)
      return 
    }
		c.JSON(http.StatusOK, items)
	}
}

func RequestedItems(db *sql.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
    items, err := process.RequestedItems(db)
    if err != nil {
      c.Status(http.StatusInternalServerError)
      return 
    }
		c.JSON(http.StatusOK, items)
	}
}
