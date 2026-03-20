package main

import (
	"encoding/json"
	"net/http"
)

func reportLost(w http.ResponseWriter, r *http.Request) {

	var item Item
	json.NewDecoder(r.Body).Decode(&item)

	stmt, _ := db.Prepare(
		"INSERT INTO items(name,color,location,status,owner) VALUES(?,?,?,?,?)",
	)

	stmt.Exec(item.Name, item.Color, item.Location, "lost", item.Owner)

	w.Write([]byte("Lost item reported"))
}

func reportFound(w http.ResponseWriter, r *http.Request) {

	var item Item
	json.NewDecoder(r.Body).Decode(&item)

	stmt, _ := db.Prepare(
		"INSERT INTO items(name,color,location,status,owner) VALUES(?,?,?,?,?)",
	)

	stmt.Exec(item.Name, item.Color, item.Location, "found", item.Owner)

	w.Write([]byte("Found item reported"))
}

func getFoundItems(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query(
		"SELECT id,name,color,location,status,owner FROM items WHERE status='found'",
	)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	defer rows.Close()

	items := []Item{}

	for rows.Next() {

		var item Item

		err := rows.Scan(
			&item.ID,
			&item.Name,
			&item.Color,
			&item.Location,
			&item.Status,
			&item.Owner,
		)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		items = append(items, item)
	}

	json.NewEncoder(w).Encode(items)
}

func getLostItems(w http.ResponseWriter, r *http.Request) {

	rows, _ := db.Query(
		"SELECT id,name,color,location,status,owner FROM items WHERE status='lost'",
	)

	items := []Item{}

	for rows.Next() {

		var item Item

		rows.Scan(
			&item.ID,
			&item.Name,
			&item.Color,
			&item.Location,
			&item.Status,
			&item.Owner,
		)

		items = append(items, item)
	}

	json.NewEncoder(w).Encode(items)
}
