# Aliens App README

Welcome to the Aliens App repository! This repository contains the source code for an application that allows users to interact with a MongoDB database to manage information about extraterrestrial life forms. Below are instructions for setting up and running the app on a server.

## Repository URL:
[Aliens App GitHub Classroom Repo](https://github.com/RIT-iSchool/mongo-project-aliens)

## Server Information:
- **RLES Server VM IP:** 172.16.0.35
- **Port Number:** 22035
- **SSH Command:** `ssh aliens.webdev.gccis.rit.edu -p 22035`

## Instructions for Running the App on the VM:

### If the VM is OFF:
1. Power on and deploy the machine.
2. Open a terminal and navigate to the client directory:
    ```bash
    cd Desktop/Aliens-App/mongo-project-aliens-main/client
    ```
3. Install client dependencies:
    ```bash
    npm install
    ```
4. Navigate to the server directory:
    ```bash
    cd ../server
    ```
5. Install server dependencies:
    ```bash
    npm install
    ```
6. Navigate back to the client directory:
    ```bash
    cd ../client
    ```
7. Build the client:
    ```bash
    npm run build
    ```
8. Check for any processes running on port 3000:
    ```bash
    lsof -i:3000
    ```
   Note the process ID and kill it:
    ```bash
    kill PID
    ```
9. Navigate back to the server directory:
    ```bash
    cd ../server
    ```
10. Start the server:
    ```bash
    nodemon index.js
    ```
11. Open a browser and go to `aliens.webdev.gccis.rit.edu`.

### If the VM is already running:
1. Open a browser and go to `aliens.webdev.gccis.rit.edu`.

## Additional Notes:
- Make sure MongoDB is installed and running on the server.
- Adjust configurations as necessary, such as MongoDB connection settings.
- Ensure that necessary ports are open and accessible.
- For development purposes, consider using environment variables for sensitive information.

Thank you for using the Aliens App! If you encounter any issues or have questions, please refer to the documentation or contact the project maintainers.
