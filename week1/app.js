const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Username</title></head>');
        res.write('<body><h1>Enter a username</h1><form action="create-user" method="POST">');
        res.write('<input type="text" name="username"><button type="submit">Send</button>')
        res.write('</form></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>User List</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>');
        res.write(fs.readFileSync('newUser.txt'));
        res.write('</li></ul></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/create-user') {
        const body = [];
        req.on('data', chunk => {
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          console.log(parsedBody.split('=')[1]);
          fs.writeFileSync('newUser.txt', parsedBody.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      }
});

server.listen(3000);