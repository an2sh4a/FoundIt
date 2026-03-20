package main

import "fmt"

var claimChannel = make(chan ClaimRequest)

func startClaimProcessor() {

	go func() {

		for claim := range claimChannel {

			fmt.Println("Processing claim:", claim.User)

			var owner string

			row := db.QueryRow(
				"SELECT user FROM claims WHERE item_id=?",
				claim.ItemID,
			)

			row.Scan(&owner)

			if owner == "" {

				stmt, _ := db.Prepare(
					"INSERT INTO claims(item_id,user) VALUES(?,?)",
				)

				stmt.Exec(claim.ItemID, claim.User)

				fmt.Println("Item claimed by", claim.User)

			} else {

				fmt.Println("Item already claimed")

			}
		}
	}()
}
