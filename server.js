const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require('mongodb');
const contacts_controller = require('./controllers/contacts_controller');

const http = require('http');
const server = http.createServer('');


async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    //const uri = "mongodb+srv://testuser:testpassword@cluster0.q4bub0t.mongodb.net/?retryWrites=true&w=majority";

    
    //console.log(process.env);
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.q4bub0t.mongodb.net/?retryWrites=true&w=majority`;
    console.log(uri);
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    server.on('request', (request,response) => 
    {
        const current_url = new URL(request.url);
        const path = current_url.pathname;
        const method = request.method;
        const query = current_url.searchParams;


        if (method == 'GET' && path == '/contacts' && query == '')
        {
           contacts_controller.contacts(request,response);
        }
        else if(method == 'GET' && path == '/contacts' && query != '')
        {
            
        }

    })

    //----------------------Calls the functions below---------------------------------------
    try 
    {
        // Connect to the MongoDB cluster
        await client.connect();


    //-----Calls to create multiple listings
        /*await createMultipleListings(client,[
        {
            name: "Beach House",
            summary: "A relaxing small beach home with a view of the hawaiian sunsets",
            bedrooms: 2,
            bathrooms: 2,
            last_review: new Date()
        },
        {
            name: "Lodge",
            summary: "Vacationing in the Alaskan winters? No problem with our heated wooded lodge!",
            bedrooms: 2,
            bathrooms: 2,
            last_review: new Date()
        }
    ]);*/

        client.db("sample_airbnb").collection('contacts').insertMany([
            {
                firstName: "Belle",
                lastName: "Garner",
                email: "n/a",
                favoriteColor: "orange",
                birthday: 4-29-2022
            },
            {
                firstName: "Joseph",
                lastName: "Garner",
                email: "joedude1994@gmail.com",
                favoriteColor: "orange",
                birthday: 10-04-1994
            },
            {
                firstName: "Jolaine",
                lastName: "Slomboski",
                email: "n/a",
                favoriteColor: "periwinkle",
                birthday: 01-19-1961
            },
        ])



    //------Calls to create a single listing
        /*await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        })*/
        
        // Make the appropriate DB calls
        //await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

export{client};

main().catch(console.error);



//-----Creates multiple new listings
async function createMultipleListings(client, newListings)
{
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following id
    (s):`);
    console.log(result.insertedIds);
}



//--------Creates one new listing
/*async function createListing(client, newListing)
{
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne
    (newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}*/





/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

server.listen(8080)