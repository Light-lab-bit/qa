const axios = require('axios');
import { expect } from '@playwright/test'; // Fixed typo: 'except' -> 'expect'

let apiUrl;

async function authenticateUser(userName, password, { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
    };
    const requestbody = {
        email: userName, // Fixed: userName instead of username to match parameter
        password: password,
    };
    const response = await request.post(`${apiUrl}/auth/login`, {
        data: requestbody,
        headers,
    });
    expect(response.status()).toBe(200); // Fixed typo: 'except' -> 'expect'
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}

async function getApiUrlBase() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = 'https://thinking-tester-contact-list.herokuapp.com';
    }
    return apiUrl;
}

async function createEntity(userData, accessToken, module, { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });
    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201); // Fixed typo: 'except' -> 'expect'
    if (responseBody && responseBody.id) {
        return responseBody.id;
    } else {
        return null;
    }
} // Added missing closing brace

// Completed deleteEntity function (moved outside createEntity)
async function deleteEntity(entityId, module, accessToken, { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.delete(`${apiUrl}${module}/${entityId}`, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(200); // or 204 depending on your API
    
    // Return true if deletion was successful
    return statusCode === 200 || statusCode === 204;
}

