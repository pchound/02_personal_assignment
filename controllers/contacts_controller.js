const http = require('http');
import {client} from './server';

function contacts(request, response)
{
    const contacts = client.db('sample_airbnb').collection('contacts').find({});
    response.writeHead(200,{'Content-Type':'application/json'});
    response.end(contacts,'utf-8');
};