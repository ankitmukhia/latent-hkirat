package main

import (
	"net/http"
	"encoding/json"
	"fmt"

	"github.com/ankitmukhia/latent/internal/auth"
)

func handlerCreateUser(w http.ResponseWriter, r *http.Request) {
	type parameter struct {
		Name string `json:"name"`
	}

	params := parameter{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		responseError(w, 500, fmt.Sprintf("Error parsing JSON: %v", err))
		return
	}

	//? db call

	responseJson(w, 201, struct{}{})
}

func handlerGetUser(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetApiKey(r.Header)	
	if err != nil {
		responseError(w, 500, fmt.Sprintf("Error parsing header: %v", err))
		return
	}

	//? db call
	
	// res with all got user
	responseJson(w, 200, struct{}{})
}	
