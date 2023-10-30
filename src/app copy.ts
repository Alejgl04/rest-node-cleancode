import fs from 'fs';
import http2 from 'http2'

const server = http2.createSecureServer({
  cert:fs.readFileSync('./keys/server.crt') ,
  key: fs.readFileSync('./keys/server.key'),
}, (req, res ) => {

  console.log(req.url);

  res.write('Hola Mundo');
  res.end();

});


server.listen(8080, () => {
  console.log('Server running on port 8080');
});


//! openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
