package main

import (
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func signup(w http.ResponseWriter, r *http.Request) {

	var user User
	json.NewDecoder(r.Body).Decode(&user)

	stmt, err := db.Prepare("INSERT INTO users(username,password) VALUES(?,?)")

	if err != nil {
		http.Error(w, "Database error", 500)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		http.Error(w, "Error hashing password", 500)
		return
	}

	stmt.Exec(user.Username, string(hashedPassword))

	w.Write([]byte("Signup successful"))
}

func login(w http.ResponseWriter, r *http.Request) {

	var loginUser User

	json.NewDecoder(r.Body).Decode(&loginUser)

	row := db.QueryRow(
		"SELECT password FROM users WHERE username=?",
		loginUser.Username,
	)

	var storedHash string

	err := row.Scan(&storedHash)

	if err != nil {

		http.Error(w, "Invalid credentials", 401)

		return

	}

	err = bcrypt.CompareHashAndPassword(

		[]byte(storedHash),

		[]byte(loginUser.Password),
	)

	if err != nil {

		http.Error(w, "Invalid credentials", 401)

		return

	}

	w.Write([]byte("Login success"))

}
