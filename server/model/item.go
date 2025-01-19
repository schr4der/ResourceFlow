package model

type Item struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
}

type SelectItem struct {
	PersonID int `json:"PersonID"`
	ItemID   int `json:"ItemID"`
	Quantity int `json:"quantity"`
}
