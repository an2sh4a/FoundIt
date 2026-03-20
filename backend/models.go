package main

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Item struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Color    string `json:"color"`
	Location string `json:"location"`
	Status   string `json:"status"`
	Owner    string `json:"owner"`
}

type ClaimRequest struct {
	User   string `json:"user"`
	ItemID int    `json:"itemID"`
}
