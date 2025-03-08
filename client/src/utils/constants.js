// src/utils/config.js

let apiUrl;
const environment = "development";
if (environment === 'production') {
    apiUrl = 'https://aliens.webdev.gccis.rit.edu'; // Production API URL
} else {
    apiUrl = 'http://localhost:3000'; // Development API URL
}

export { apiUrl };
