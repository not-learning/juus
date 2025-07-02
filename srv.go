package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir(""))
	http.Handle("/", fs)
	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	http.ServeFile(w, r, "web/main.html")
	// })
	log.Fatal(http.ListenAndServe(":8000", nil))
}
