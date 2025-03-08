#!/bin/bash

# Define variables
HOST="localhost"  # MongoDB host
PORT="27017"      # MongoDB port
DB_NAME="Aliens"  # Database name
COLLECTION_NAME="UFO"  # Collection name

# Make SURE TO CHANGE THIS PATH
CSV_FILE="UFO_Modified_Data.csv"  # Path to your CSV file

# Import CSV data into MongoDB collection
mongoimport --host $HOST --port $PORT --db $DB_NAME --collection $COLLECTION_NAME --type csv --file $CSV_FILE --headerline

echo "CSV file imported successfully into MongoDB $COLLECTION_NAME"