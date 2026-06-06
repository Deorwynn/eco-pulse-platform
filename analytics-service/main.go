package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// EngagementPayload defines the strict schema contract incoming from Next.js
type EngagementPayload struct {
	ArticleSlug string `json:"articleSlug"`
	Action      string `json:"action"` // e.g., "view" or "like"
}

// ResponsePayload structures our server's outgoing message confirmation
type ResponsePayload struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Views   int    `json:"views"`
}

func handleEngagement(w http.ResponseWriter, r *http.Request) {
	// Essential CORS Headers so the local Next.js app can talk to it safely
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle browser preflight checks for CORS
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload EngagementPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Bad request body parsing", http.StatusBadRequest)
		return
	}

	// Logging transaction parameters directly to the console terminal trace
	fmt.Printf("[METRICS LOG] Received engagement trigger: Action='%s' for Slug='%s'\n", 
		payload.Action, payload.ArticleSlug)

	// Simulate a real-time tracking response increments
	response := ResponsePayload{
		Status:  "success",
		Message: "Metric registered successfully in the system cluster",
		Views:   104, // Mocked live aggregate database query value
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/analytics/engagement", handleEngagement)

	port := ":8080"
	fmt.Printf("🚀 Analytics engine compiled and listening actively on port %s...\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Failed to initialize server loop: %v", err)
	}
}