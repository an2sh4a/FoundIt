package main

import "testing"

func TestScoreCalculation(t *testing.T) {

	lost := Item{
		Name:        "Black Bag",
		Color:       "Black",
		Brand:       "Nike",
		Location:    "Block A",
		Category:    "Bags",
		Description: "zip broken",
		DateLost:    "2026-03-01",
	}

	found := Item{
		Name:        "black bag",
		Color:       "black",
		Brand:       "nike",
		Location:    "block a",
		Category:    "Bags",
		Description: "zip slightly broken",
		DateFound:   "2026-03-02",
	}

	matcher := ItemMatcher{}

	score := matcher.Score(lost, found)

	if score < MinScore {

		t.Error("Expected score >= 65 but got", score)

	}

}
