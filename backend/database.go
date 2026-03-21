package main

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var db *sql.DB

func initDB() {

	var err error

	db, err = sql.Open("sqlite", "lostfound.db")

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Database connected")

	createTables()
}

func createTables() {

	userTable := `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    );`

	itemTable := `
CREATE TABLE IF NOT EXISTS items(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 color TEXT,
 brand TEXT,
 location TEXT,
 date TEXT,
 category TEXT,
 description TEXT,
 contact TEXT,
 status TEXT,
 owner TEXT
);`

	claimTable := `
    CREATE TABLE IF NOT EXISTS claims(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        user TEXT
    );`

	db.Exec(userTable)
	db.Exec(itemTable)
	db.Exec(claimTable)
}
