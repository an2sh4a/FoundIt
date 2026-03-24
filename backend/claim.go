package main

import (
	"encoding/json"
	"net/http"
)

func claimItem(w http.ResponseWriter, r *http.Request) {

	var req ClaimRequest

	json.NewDecoder(r.Body).Decode(&req)

	lostItem := getLostItemByUser(req.User)

	foundItem := getItemByID(req.ItemID)

	matcher := ItemMatcher{}

	score := matcher.Score(lostItem, foundItem)

	if score < MinScore {

		http.Error(w, "Match score too low", 400)

		return

	}

	claimChannel <- req

	json.NewEncoder(w).Encode(map[string]int{
		"score": score,
	})

}
