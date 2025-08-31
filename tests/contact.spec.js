import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/login.po.js';
import { ContactPage } from '../pageObject/contact.po.js';
const testData = require('../testData/contact.json');
const contactTestData = require('../../fixtures/contactFixtures.json');
const { authenticateUser, getApiUrlBase, createEntity, deleteEntity } = require('../tests/helper.spec.js');

// Missing helper functions - add these to your helper.spec.js file
async function getEntity(accessToken, module, { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.get(`${apiUrl}${module}`, {
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    // Return the first contact ID if it exists
    if (responseBody && responseBody.length > 0) {
        return responseBody[0]._id || responseBody.id;
    }
    return null;
}

async function validateEntity(accessToken, endpoint, expectedStatus, { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.get(`${apiUrl}${endpoint}`, {
        headers,
    });
    expect(response.status()).toBe(parseInt(expectedStatus));
    return response.status();
}

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page); // Removed duplicate declaration
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/'); // Updated URL to match your API
    await loginPage.login(testData.username, testData.password);
    await loginPage.verifyValidlogin(); // Fixed method name
});

test.describe('Contact test cases', () => {
    test('Contact Add test', async ({ page, request }) => {
        let accessToken; // Properly declare the variable
        
        const contact = new ContactPage(page);
        await contact.contactAdd(
            contactTestData.firstName, 
            contactTestData.lastName, 
            contactTestData.email, 
            contactTestData.phone, 
            contactTestData.dob, 
            contactTestData.address, 
            contactTestData.city, 
            contactTestData.country, 
            contactTestData.state
        );
        await contact.viewContact();
        await contact.validateContactCreated(
            contactTestData.firstName, 
            contactTestData.lastName, 
            contactTestData.email, 
            contactTestData.phone, 
            contactTestData.dob, 
            contactTestData.address, 
            contactTestData.city, 
            contactTestData.country, 
            contactTestData.state
        );
        
        // Fixed authentication call - corrected parameter order
        accessToken = await authenticateUser(testData.username, testData.password, { request });
        
        // Get contact ID and then delete it
        const id = await getEntity(accessToken, '/contacts', { request });
        if (id) {
            await deleteEntity(id, '/contacts', accessToken, { request });
            await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
        }
    });

    test.only('Contact Edit test', async ({ page, request }) => {
        let accessToken; // Properly declare the variable
        
        const testContactData = { // Renamed from 'Date' to avoid confusion
            "firstName": "ram",
            "lastName": "kumar", 
            "email": "ram@gmail.com",
            "phone": "1234567890",
            "dateOfBirth": "1990-01-01", // Changed from 'dob' to match API expectations
            "street1": "123 Main St", // Changed from 'address' to match API expectations
            "city": "New York",
            "stateProvince": "NY", // Changed from 'state' to match API expectations  
            "postalCode": "10001", // Added required field
            "country": "USA"
        };
        
        const contact = new ContactPage(page);
        
        // Fixed authentication call - corrected parameter order  
        accessToken = await authenticateUser(testData.username, testData.password, { request });
        
        // Create contact via API first
        const contactId = await createEntity(testContactData, accessToken, '/contacts', { request });
        
        // Reload page to see the new contact
        await page.reload();
        
        // Edit the contact using the page object
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        
        // Clean up - delete the created contact
        if (contactId) {
            await deleteEntity(contactId, '/contacts', accessToken, { request });
        }
    });
});