package main

import (
	"encoding/json"
	"net/http"
)

func signup(w http.ResponseWriter, r *http.Request) {

	var user User
	json.NewDecoder(r.Body).Decode(&user)

	stmt, err := db.Prepare("INSERT INTO users(username,password) VALUES(?,?)")

	if err != nil {
		http.Error(w, "Database error", 500)
		return
	}

	stmt.Exec(user.Username, user.Password)

	w.Write([]byte("Signup successful"))
}

func login(w http.ResponseWriter, r *http.Request) {

	var loginUser User
	json.NewDecoder(r.Body).Decode(&loginUser)

	rows, _ := db.Query("SELECT username,password FROM users")

	for rows.Next() {

		var username string
		var password string

		rows.Scan(&username, &password)

		if username == loginUser.Username && password == loginUser.Password {
			w.Write([]byte("Login success"))
			return
		}
	}

	http.Error(w, "Invalid credentials", 401)
}
