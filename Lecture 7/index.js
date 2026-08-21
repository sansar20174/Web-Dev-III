const http = require('http');

const server = http.createServer((req, res) => {
    // res.write('<h1>Hello, World!</h1>');
    // res.end();

    // console.log(req.url);
    // res.end();


    // if (req.url === '/') {
    //     res.write('<h1>Home Page</h1>');
    //     res.end()
    // }

    // if (req.url === '/about') {
    //     res.write('<h1>About Page</h1>');
    //     res.end()
    // }

    // console.log(req.method);
    // res.end()

    // if (req.method === 'GET') {
    //     res.write('<h1>GET Request</h1>');
    //     res.end()
    // }

    // if (req.method === 'POST') {
    //     res.write('<h1>POST Request</h1>');
    //     res.end()
    // }

    // if (req.method === 'PUT') {
    //     res.write('<h1>PUT Request</h1>');
    //     res.end()
    // }

    // if (req.method === 'DELETE') {
    //     res.write('<h1>DELETE Request</h1>');
    //     res.end()

    // if (req.url === '/users' && req.method === 'GET') {
    //     res.write('<h1>GET Users</h1>');
    //     res.end()
    // }
    // if (req.url === '/users' && req.method === 'POST') {
    //     res.write('<h1>POST Users</h1>');
    //     res.end()
    // }

    // console.log(req.headers);
    // res.end()

    if (req.url === '/') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            console.log(body);
            res.end(body)
        })
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});