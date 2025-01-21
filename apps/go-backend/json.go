package main

import (
	"net/http"
	"log"
	"encoding/json"
)

func responseError(w http.ResponseWriter, code int, msg string) {
	if code > 499 {
		log.Printf("Response with 5XX erro: %v", msg)
	}

	type errorMsg struct {
		Error string `json:"error"`
	}

	responseJson(w, code, errorMsg{
		Error: msg,
	})
}

func responseJson(w http.ResponseWriter, code int, payload interface{}) {
	json, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error marshalling JSON %v", err)
		w.WriteHeader(500)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(json)
}	
