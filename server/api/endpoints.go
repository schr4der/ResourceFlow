package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Health(c *gin.Context) {
	c.Status(http.StatusOK)
}

func GetInventory(c *gin.Context) {

}
