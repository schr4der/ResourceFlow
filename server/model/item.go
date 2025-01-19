package model

type Item struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Quantity    int    `json:"quantity"`
}

type SelectItem struct {
	PersonID int `json:"person_id"`
	ItemID   int `json:"item_id"`
	Quantity int `json:"quantity"`
}
