var http = require('http'),
        qs = require('querystring'),
        fs = require('fs');

var server = http.createServer(function (req, res) {
    if ('GET' == req.method && '/' == req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(res);
    } else if ('POST' == req.method && '/contact' == req.url) {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function() {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<p>Email: ' + qs.parse(body).your_email + '</p>');
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(3000);

