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
	Person1Name string `json:"person1_name"`
	Person2Name string `json:"person2_name"`
	ItemName    string `json:"item_name"`
	Quantity    int    `json:"quantity"`
}

type Person struct {
  ID int    `json:"id"`
  Name     string `json:"name"`
  Email    string `json:"email"`
  Location string `json:"location"`
}
