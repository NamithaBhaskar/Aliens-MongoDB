# If running the app locally on your machine

# Aliens App README

## Repository URL:
[Aliens App GitHub Classroom Repo](https://github.com/RIT-iSchool/mongo-project-aliens)

- Download the code form main branch on your machine
 
1. Make sure under client/src/utils/constants.js environment is set to "developer" and mongod is running in the background
2. Install client dependencies: in client directory
    ```bash
    npm install
    ```
3. Install server dependencies: in server directory
    ```bash
    npm install
    ```
4. Start the server
    ```bash
    nodemon index.js
    ```
5. Start the client build
    ```bash
    npm run dev
    ```
    This will give us one URL, open that URL in browser.
The local instance of our app is up and running on your machine.

## Instructions for Running the App on the VM:

### If the VM is OFF:
1. Power on and deploy the machine. 
2. Open a terminal and navigate to the client directory:
    ```bash
    cd Desktop/Aliens-App/mongo-project-aliens-main/client
    ```
3. Make sure under client/src/utils/constants.js environment is set to "production"
4. Install client dependencies:
    ```bash
    npm install
    ```
5. Navigate to the server directory:
    ```bash
    cd ../server
    ```
6. Install server dependencies:
    ```bash
    npm install
    ```
7. Navigate back to the client directory:
    ```bash
    cd ../client
    ```
8. Build the client:
    ```bash
    npm run build
    ```
9. Check for any processes running on port 3000:
    ```bash
    lsof -i:3000
    ```
   Note the process ID and kill it:
    ```bash
    kill PID
    ```
10. Navigate back to the server directory:
    ```bash
    cd ../server
    ```
11. Start the server:
    ```bash
    nodemon index.js
    ```
12. Open a browser and go to `aliens.webdev.gccis.rit.edu`.

### If the VM is already running:
1. Open a browser and go to `aliens.webdev.gccis.rit.edu`.

## Additional Notes:
- Make sure MongoDB is installed and running on the server.
- Adjust configurations as necessary, such as MongoDB connection settings.
- Ensure that necessary ports are open and accessible.
- For development purposes, consider using environment variables for sensitive information.

Thank you for using the Aliens App! If you encounter any issues or have questions, please refer to the documentation or contact the project maintainers.
