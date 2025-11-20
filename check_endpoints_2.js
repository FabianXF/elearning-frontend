const http = require('http');

const paths = [
    '/api/cursos?id=2',
    '/api/cursos?idCurso=2',
    '/api/cursos/2/modulos',
    '/api/cursos/detalle/2',
    '/api/curso/detalle/2'
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
