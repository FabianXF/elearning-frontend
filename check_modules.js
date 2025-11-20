const http = require('http');

const paths = [
    '/api/modulos?idCurso=2',
    '/api/modulos/curso/2',
    '/api/cursos/modulos/2',
    '/api/modules?courseId=2'
];

paths.forEach(path => {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: path,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`${path}: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(`${path}: ${e.message}`);
    });

    req.end();
});
