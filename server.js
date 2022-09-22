const dotenv = require("dotenv");
dotenv.config();
const contacts_route = require('./routes/contactsRoute.js');
const http = require('http');

let server = http.createServer((req, res) => 
{
  
    let url = new URL(req.url, `http://${req.headers.host}`);
    
    console.log(`recieved request @ url ${url}, method with ${req.method}.`);

    contacts_route(req,res);

}).listen(8080);
console.log('server:' + `http://${server.address().address}:${server.address().port}`);