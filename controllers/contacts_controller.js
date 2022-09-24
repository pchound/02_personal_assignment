const http = require('http');
const client = require('../db.js').client;
const mongodb = require('mongodb');
async function contacts(request, response)
{
    console.log('Responding to request');
    const contacts = await client.db('sample_airbnb').collection('contacts').find({}).toArray();
    response.writeHead(200,{'Content-Type':'application/json'});
    response.end(JSON.stringify(contacts),'utf-8');
};

async function contactsId(request, response)
{
    let uri = new URL(request.url, `http://${request.headers.host}`);
    let params = uri.searchParams;
    let id = params.get('id');
    let contact = await client.db('sample_airbnb').collection('contacts').findOne({'_id' : mongodb.ObjectId(id)});
    console.log('Results: ' + contact);
    console.log('search_id:' + id);

    response.writeHead(200,{'ContentType' : 'application/json'});
    response.end(JSON.stringify(contact), "utf-8");
};

//POST
async function saveContact(request,response)
{
    let uri = new URL(request.url, `http://${request.headers.host}`);
    /*let params = uri.searchParams;
    let id = params.get('id');
    let contact = await client.db('sample_airbnb').collection('contacts').findOne({'_id' : mongodb.ObjectId(id)});*/

    client.db.collection("sample_airbnb").insertOne({'firstName': 'First', 'lastName': 'Last'}, function (error, result) 
    {
        if (error) 
        {
            return response.send("Insert failed");
        }
        return response.status(201).send(result.insertedId.toString());
    });

    console.log('Results: ' + contact);
    console.log('search_id:' + id);

    response.writeHead(200,{'ContentType' : 'application/json'});
    response.end(JSON.stringify(contact), "utf-8");
};

module.exports={contacts, contactsId};