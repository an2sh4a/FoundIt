package main

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Item struct {
	ID int `json:"id"`

	Name string `json:"name"`

	Color string `json:"color"`

	Brand string `json:"brand"`

	Location string `json:"location"`

	DateLost string `json:"dateLost"`

	DateFound string `json:"dateFound"`

	Category string `json:"category"`

	Description string `json:"description"`

	Contact string `json:"contact"`

	Status string `json:"status"`

	Owner string `json:"owner"`

	Claimed bool `json:"claimed"`
}

type ClaimRequest struct {
	User   string `json:"user"`
	ItemID int    `json:"itemID"`
}
