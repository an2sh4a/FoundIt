package main

type Matcher interface {
	Match(a Item, b Item) bool
}

type ColorMatcher struct{}

func (c ColorMatcher) Match(a Item, b Item) bool {
	return a.Color == b.Color
}
