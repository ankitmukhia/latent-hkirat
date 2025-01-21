package main

import (
	"os"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

type state struct {
	DB string // make type of db laiter
}

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT not found")
	}
	
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders: []string{"Link"},
		AllowCredentials: false,
		MaxAge: 300,
	}))

	v1Router := chi.NewRouter()

	v1Router.Get("/json", handlerJson)
	v1Router.Get("/err", handlerError)

	// all handler for latent

	r.Mount("/v1", v1Router)

	srv := &http.Server{
		Addr: ":" + port,
		Handler: r,
	}

	log.Printf("Serving on port: %v", port)
	log.Fatal(srv.ListenAndServe())
}	
