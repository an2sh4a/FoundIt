package main

import "strings"

const MinScore = 65

type Matcher interface {
	Score(lost Item, found Item) int
}

type ItemMatcher struct{}

var weights = map[string]int{
	"name":        10,
	"category":    10,
	"color":       20,
	"brand":       20,
	"location":    15,
	"description": 25,
}

func wordMatchScore(a string, b string, maxScore int) int {

	aWords := strings.Fields(strings.ToLower(a))
	bText := strings.ToLower(b)

	if len(aWords) == 0 {
		return 0
	}

	matches := 0

	for _, w := range aWords {

		if strings.Contains(bText, w) {
			matches++
		}

	}

	return (matches * maxScore) / len(aWords)

}

func (ItemMatcher) Score(lost Item, found Item) int {

	if lost.DateLost > found.DateFound {
		return 0
	}

	score := 0

	score += wordMatchScore(lost.Name, found.Name, weights["name"])

	if strings.ToLower(lost.Category) == strings.ToLower(found.Category) {
		score += weights["category"]
	}

	if strings.ToLower(lost.Color) == strings.ToLower(found.Color) {
		score += weights["color"]
	}

	if strings.ToLower(lost.Brand) == strings.ToLower(found.Brand) {
		score += weights["brand"]
	}

	score += wordMatchScore(lost.Location, found.Location, weights["location"])

	score += wordMatchScore(lost.Description, found.Description, weights["description"])

	return score

}

type MatchResult struct {
	Item  Item `json:"item"`
	Score int  `json:"score"`
}

func bestMatch(lost Item, foundItems []Item) MatchResult {

	var m Matcher = ItemMatcher{}

	best := MatchResult{}
	highest := 0

	for _, f := range foundItems {

		s := m.Score(lost, f)

		if s > highest {

			highest = s

			best = MatchResult{
				Item:  f,
				Score: s,
			}

		}

	}

	return best

}
