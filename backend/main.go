package main

import (
	"fmt"
	"net/http"
)

func main() {

	initDB()

	startClaimProcessor()

	http.HandleFunc("/signup", signup)
	http.HandleFunc("/login", login)

	http.HandleFunc("/report-lost", reportLost)
	http.HandleFunc("/report-found", reportFound)

	http.HandleFunc("/found-items", getFoundItems)
	http.HandleFunc("/lost-items", getLostItems)

	http.HandleFunc("/claim", claimItem)

	fmt.Println("Server running on :8080")

	http.ListenAndServe("0.0.0.0:8080", nil)
}
