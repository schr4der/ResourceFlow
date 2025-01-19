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

type Match struct {
	Person1Name int `json:"person1_name"`
	Person2Name int `json:"person2_name"`
	ItemName    int `json:"item_name"`
	Quantity    int    `json:"quantity"`
}
