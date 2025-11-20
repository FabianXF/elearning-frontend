const http = require('http');

const paths = [
    '/api/cursos/2',
    '/api/curso/2',
    '/api/cursos/detalle/2',
    '/api/courses/2',
    '/api/cursos/get/2'
];

paths.forEach(path => {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: path,
        method: 'GET' // Using GET to be sure, HEAD might be rejected by some APIs
    };

    const req = http.request(options, (res) => {
        console.log(`${path}: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`${path}: ${e.message}`);
    });

    req.end();
});
