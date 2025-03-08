# Instructions for MACOS

## Load Data
### File: scripts/load_data.sh

- Step 1: Enter the correct variable names in load_data.sh
  - Also make sure mongo instance is running in the background
- Step 2: Open terminal and Move to the scripts Directory
- Step 3: Run command `chmod +x ./load_data.sh`
- Step 4: Put the UFO_Modified_Data.csv in the main directory outside the scripts folder
- Step 4: Run bash script `./load_data.sh`

## Add GeoJSON format
### File: scrips/geoJSON.js

- Step 1: uncomment line which deletes all the documents from geoUFO.
  - Run the file `mongosh --quiet scripts/geoJSON.js`
- Step 2: undo step 1 and uncomment the part which loads every document form UFO to geoUFO.
  - Run the file `mongosh --quiet scripts/geoJSON.js`
- Step 3: undo step 2 and uncomment part which adds a geoJSON property called loaction in geoUFO and creates an index.
  - Run the file `mongosh --quiet scripts/geoJSON.js`
- Step 4: undo step 3 and uncomment part which checks for sightings near Rochester.
  - Run the file `mongosh --quiet scripts/geoJSON.js` and check if this works!

## Add Report_ID in the Images collection (gridFS)

### File: scripts/updateImageCollection.js

## Add Report_ID in the geoUFO collection

### File: scripts/updateUFOCollection.js

## Scrapting data from report links, to generate images database

### File: scripts/ufo_dataset_creation.py
