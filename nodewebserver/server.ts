import express from 'express';
import path from 'path';
import Axios from 'axios';

let port: number = 80;
let server = express();
let dirname: string = __dirname;

// for parsing application/json
server.use( express.json() );
// for parsing application/x-www-form-urlencoded
server.use( express.urlencoded( { extended: true } ));

dirname = path.join(dirname, '..');
server.use( express.static( path.join(dirname, '/public')));

server.set('view engine', 'ejs');
server.set('views', path.join(dirname, '/views'));

server.post('/addbook', async (req, res) => {
    try
    {
		let containerName: string = "webservice";
		let serviceResponse = await 
			Axios.post(`http://${containerName}:1339/books`, {         
			title: req.body["title-textbox"],
			author: req.body["author-textbox"],
			price: req.body["price-textbox"],
			image: req.body["image"],
		});
		console.log(`Service response = ${serviceResponse.status}`);
		res.redirect('thanks.html');
    }
    catch{
        console.log(Error);
        res.status(403).end();
    }
});

server.post('/addcart', async (req, res) => {
    try
    {
		let containerName: string = "webservice";
		let serviceResponse = await 
			Axios.post(`http://${containerName}:1339/cart`, {         
			quantity: req.body["quantity-textbox"],
			bookId: req.body["bookId"],
		});
		console.log(`Service response = ${serviceResponse.status}`);
		res.redirect('thanks.html');
    }
    catch{
        console.log(Error);
        res.status(403).end();
    }
});

server.post('/addorder', async (req, res) => {
    try
    {
		let containerName: string = "webservice";
		let serviceResponse = await 
			Axios.post(`http://${containerName}:1339/order`, {        
            bookNo: req.body["bookNo"], 
			quantityNo: req.body["quantityNo"],
			firstName: req.body["firstName"],
			lastName: req.body["lastName"],
			email: req.body["email"],
		});
		console.log(`Service response = ${serviceResponse.status}`);
		res.redirect('thanks.html');
    }
    catch{
        console.log(Error);
        res.status(403).end();
    }
});

server.get('/readbooks', async (req, res) => {
    try
    {
        console.log("Get books");
        let containerName: string = "webservice";
        let response = await Axios.get(`http://${containerName}:1339/books`);
        res.render('displayallbooks', { books: response.data } );
    }
    catch(error)
    {
        console.log(Error);
        res.status(403).send({});
    }
});

server.get('/readcart', async (req, res) => {
    try
    {
        console.log("Get cart");
        let containerName: string = "webservice";
        let response = await Axios.get(`http://${containerName}:1339/cart`);
        res.render('displayallcart', { cart: response.data } );
    }
    catch(error)
    {
        console.log(Error);
        res.status(403).send({});
    }
});


server.listen(port, () => console.log(`Example web server listening at http://localhost:${port}`));	