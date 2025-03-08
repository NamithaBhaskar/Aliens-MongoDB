#!/bin/bash

# Set your MongoDB connection string
MONGODB_URI="mongodb://localhost:27017/Aliens"

DB="Aliens"

# Set the path to the folder containing images
IMAGES_FOLDER="images"

# Iterate through each image file in the folder
for IMAGE_FILE in $IMAGES_FOLDER/*.jpg; do
    # Extract the report ID from the path and Image File, which is basically
    REPORT_ID=$(basename "$IMAGE_FILE" | sed 's/^images\///;s/-.*//')
    METADATA="{\"report_id\":\"$REPORT_ID\"}"
    # Extract file name without the path for gridFS
    FILENAME=$(basename "$IMAGE_FILE")
    # Run mongofiles put command with metadata
    mongofiles --db $DB put $FILENAME --local $IMAGE_FILE

    # Optional: Check if the command was successful
    if [ $? -eq 0 ]; then
        echo "File $FILENAME uploaded successfully to MongoDB GridFS with metadata."
    else
        echo "Error uploading file $FILENAME to MongoDB GridFS."
    fi
done
