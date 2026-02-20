const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const publicDir = path.join(__dirname);

const server = http.createServer((req, res) => {
    let filePath = path.join(publicDir, req.url === '/' ? 'netflix.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.ico') contentType = 'image/x-icon';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
