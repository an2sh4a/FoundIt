package main

import "strings"

const MinScore = 65

type MatchResult struct {
	Item  Item `json:"item"`
	Score int  `json:"score"`
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

func scoreMatch(lost Item, found Item) int {

	if lost.DateLost > found.DateFound {
		return 0
	}

	score := 0

	score += wordMatchScore(lost.Name, found.Name, 10)

	if strings.ToLower(lost.Category) == strings.ToLower(found.Category) {
		score += 10
	}

	if strings.ToLower(lost.Color) == strings.ToLower(found.Color) {
		score += 20
	}

	if strings.ToLower(lost.Brand) == strings.ToLower(found.Brand) {
		score += 20
	}

	score += wordMatchScore(lost.Location, found.Location, 15)

	score += wordMatchScore(lost.Description, found.Description, 25)

	return score

}

func bestMatch(lost Item, foundItems []Item) MatchResult {

	best := MatchResult{}
	highest := 0

	for _, f := range foundItems {

		s := scoreMatch(lost, f)

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
