const dotenv = require("dotenv");
dotenv.config();
const contacts_route = require('./routes/contactsRoute.js');
let PORT = process.env.PORT || 3000;
const http = require('http');

let server = http.createServer((req, res) => 
{
    let url = new URL(req.url, `http://${req.headers.host}`);
    
    console.log(`recieved request @ url ${url}, method with ${req.method}.`);

    contacts_route(req,res);

}).listen(PORT);