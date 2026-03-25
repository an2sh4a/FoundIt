package main

import (
	"fmt"
	"sync"
)

var claimChannel = make(chan ClaimRequest)

var dbMutex sync.Mutex

func startClaimProcessor() {

	go func() {

		for claim := range claimChannel {

			fmt.Println("Processing claim:", claim.User)

			dbMutex.Lock()

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

			dbMutex.Unlock()

		}

	}()

}
