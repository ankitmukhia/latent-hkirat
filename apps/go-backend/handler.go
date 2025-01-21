package main

import (
	"net/http"
)

func handlerError(w http.ResponseWriter, r *http.Request) {
	responseError(w, 400, "Something went wrong!")
}

func handlerJson(w http.ResponseWriter, r *http.Request) {
	responseJson(w, 200, struct{}{})
}

