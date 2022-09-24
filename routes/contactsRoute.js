const contacts_controller = require('../controllers/contacts_controller');
function route(req, res)
{
    let method = req.method;
    let path = req.url;
    let uri = new URL(req.url, `http://${req.headers.host}`);
    let params = uri.searchParams;
    let id = params.get('id');

    console.log('id search results: ' + id);
    console.log('pathname: ' + uri.pathname);
    
    if (method == 'GET' && uri.pathname == '/contacts' && id == null)
    {
        contacts_controller.contacts(req,res);
    }
    else if (method == 'GET' && uri.pathname == '/contacts' && id != null)
    {
        contacts_controller.contactsId(req,res);
    }



    else if (method == 'POST' && uri.pathname == '/contacts')
    {
        contacts_controller.saveContact(req,res);
    }
    else if (method == 'PUT' && uri.pathname == '/contacts' && id != null)
    {
        contacts_controller.contactsId(req,res);
    }
    else if (method == 'DELETE' && uri.pathname == '/contacts' && id != null)
    {
        contacts_controller.contactsId(req,res);
    }



    else
    {
        res.writeHead(404,{'ContentType' : 'text/plain'});
        res.end();
    }
}
module.exports = route;