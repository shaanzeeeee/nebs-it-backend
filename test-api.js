/**
 * API Test Script
 * 
 * Tests the notice creation API endpoint to ensure it's working correctly.
 * This is useful for debugging API issues without using the frontend.
 * 
 * Run with: node test-api.js
 * Make sure the server is running first!
 */

/**
 * Test the POST /api/notices endpoint
 * Creates a test notice and logs the response
 */
async function testCreate() {
    try {
        // Sample notice data to send to the API
        const payload = {
            title: 'Test Notice',
            type: 'General / Company-Wide',
            department: 'All Department',
            publishDate: '2025-12-12',
            content: 'Debug content',
            status: 'Draft'
        };

        console.log('Sending payload:', payload);

        // Make POST request to create notice
        const res = await fetch('http://localhost:5000/api/notices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Check if request was successful
        if (!res.ok) {
            // Request failed - show error details
            const errorData = await res.json();
            console.error('API Error Status:', res.status);
            console.error('API Error Data:', errorData);
        } else {
            // Request succeeded - show created notice
            const data = await res.json();
            console.log('Success:', data);
        }

    } catch (err) {
        // Network or server error
        console.error('Network/Server Error:', err.message);
    }
}

// Run the test
testCreate();
