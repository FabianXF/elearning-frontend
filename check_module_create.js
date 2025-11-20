const http = require('http');

const courseId = 2; // Assuming course ID 2 exists
const postData = JSON.stringify({
    titulo: "Test Module Node"
});

const options = {
    hostname: 'localhost',
    port: 8080,
    path: `/api/cursos/${courseId}/modulos`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        // Note: This test will fail if auth is required, but checking for 401 vs 400 is useful.
        // If 401, it means payload format might be ok but auth missing.
        // If 400, payload is likely wrong.
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${data}`);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
