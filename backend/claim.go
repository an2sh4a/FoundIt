package main

import (
	"encoding/json"
	"net/http"
)

func claimItem(w http.ResponseWriter, r *http.Request) {

	var claim ClaimRequest

	err := json.NewDecoder(r.Body).Decode(&claim)

	if err != nil {
		http.Error(w, "Invalid request", 400)
		return
	}

	claimChannel <- claim

	w.Write([]byte("Claim request submitted"))
}
