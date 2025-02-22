package main

import (
	"fmt"
	"live-data/internal/kafka"
	"live-data/internal/ws"
	"net/http"
)

func main() {
	// Start Kafka consumer (listening to "data-lake" topic)
	go kafka.StartConsumer("kafka:9092", "data-lake", "live-data-consumer")

	// Start WebSocket server
	http.HandleFunc("/ws/raw", ws.HandleRawConnections)
	http.HandleFunc("/ws/structured", ws.HandleStructuredConnections)

	fmt.Println("Live Data WebSocket server started on :8090")
	http.ListenAndServe(":8090", nil)
}
