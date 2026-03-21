package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func reportLost(w http.ResponseWriter, r *http.Request) {

	var item Item

	err := json.NewDecoder(r.Body).Decode(&item)

	if err != nil {
		http.Error(w, "Invalid request", 400)
		return
	}

	stmt, err := db.Prepare("INSERT INTO items(name,color,brand,location,date,category,description,contact,status,owner) VALUES(?,?,?,?,?,?,?,?,?,?)")

	if err != nil {
		log.Println(err)
		http.Error(w, "DB error", 500)
		return
	}

	_, err = stmt.Exec(
		item.Name,
		item.Color,
		item.Brand,
		item.Location,
		item.DateLost,
		item.Category,
		item.Description,
		item.Contact,
		"lost",
		item.Owner,
	)

	if err != nil {
		log.Println(err)
		http.Error(w, "Insert failed", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Lost item reported",
	})

}

func reportFound(w http.ResponseWriter, r *http.Request) {

	var item Item

	err := json.NewDecoder(r.Body).Decode(&item)

	if err != nil {
		http.Error(w, "Invalid request", 400)
		return
	}

	stmt, err := db.Prepare("INSERT INTO items(name,color,brand,location,date,category,description,contact,status,owner) VALUES(?,?,?,?,?,?,?,?,?,?)")

	if err != nil {
		log.Println(err)
		http.Error(w, "DB error", 500)
		return
	}

	_, err = stmt.Exec(
		item.Name,
		item.Color,
		item.Brand,
		item.Location,
		item.DateFound,
		item.Category,
		item.Description,
		item.Contact,
		"found",
		item.Owner,
	)

	if err != nil {
		log.Println(err)
		http.Error(w, "Insert failed", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Found item reported",
	})

}

func getFoundItems(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query(`
SELECT
i.id,
i.name,
i.color,
i.brand,
i.location,
i.date,
i.category,
i.description,
i.contact,
i.status,
i.owner,
CASE WHEN c.id IS NULL THEN 0 ELSE 1 END
FROM items i
LEFT JOIN claims c ON i.id=c.item_id
WHERE i.status='found'
`)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	defer rows.Close()

	items := []Item{}

	for rows.Next() {

		var item Item
		var date string
		var claimed int

		err := rows.Scan(
			&item.ID,
			&item.Name,
			&item.Color,
			&item.Brand,
			&item.Location,
			&date,
			&item.Category,
			&item.Description,
			&item.Contact,
			&item.Status,
			&item.Owner,
			&claimed,
		)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		item.DateFound = date
		item.Claimed = claimed == 1

		items = append(items, item)

	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)

}

func getLostItems(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query(`
SELECT
id,
name,
color,
brand,
location,
date,
category,
description,
contact,
status,
owner
FROM items
WHERE status='lost'
`)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	defer rows.Close()

	items := []Item{}

	for rows.Next() {

		var item Item
		var date string

		err := rows.Scan(
			&item.ID,
			&item.Name,
			&item.Color,
			&item.Brand,
			&item.Location,
			&date,
			&item.Category,
			&item.Description,
			&item.Contact,
			&item.Status,
			&item.Owner,
		)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		item.DateLost = date

		items = append(items, item)

	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)

}
