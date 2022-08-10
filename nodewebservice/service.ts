import express from 'express';
import * as process from 'process';
import cors from 'cors';
import { IncomingMessage, ServerResponse  } from "http";
import { PGBookTable } from './pgdbbook.js';
import { PGCartTable } from './pgdbcart.js';

class WebserviceProcess
{
	//private _hostname: string = process.env["SERVER_IP_ADDRESS"] || '127.0.0.1';	// In local computer
	private _port: number = 1339;
	
	constructor()
	{
	}
	
	// Just for debugging
	private DumpObject(obj: any, msg: string = ""): void
	{
		let output:string = msg;
		for (var property in obj) {
			output += property + ': ' + obj[property]+'; ';
		}
		console.log(output);		
	}
	
	Start(): void
	{
		let service = express();
		let dbname: string = "testdb1";
			
		service.get('/', function (req, res) {
			res.send('Welcome!');
		});
		
		service.get('/hi', function (req, res) {
			res.send('Hello!');
		});	
		
		service.get('/hello/:title', function (req, res) {
			res.send(`Hello ${req.params.title}`);
		});	
		
		service.get('/error', function (req, res) {
			res.status(403).end();
		});
		
		let corsOptions = {
		  origin: "*",
		  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		  allowedHeaders: "Authorization, Origin, Content-Type, Accept, X-Requested-With",
		  maxAge: 0//,      // Allow us to see preflight check, should be more like 1728000
		  // preflightContinue: false,
		  // optionsSuccessStatus: 204
		};
		
		service.use(cors(corsOptions));
				
		// Enable Express to read the Request Body
		service.use(express.json()) 						// for parsing application/json
		service.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
			
		service.post('/books', async (req, res) => {
			let bookDB: PGBookTable = new PGBookTable();
			await bookDB.Insert({
				Title: req.body.title,
				Author: req.body.author,
				Price: req.body.price,
				Image: req.body.image,
			}, res);
		});

		service.post('/cart', async (req, res) => {
			let cartDB: PGCartTable = new PGCartTable();
			await cartDB.Insert({
				Quantity: req.body.quantity,
				BookId: req.body.bookId,
			}, res);
		});

		service.post('/order', async (req, res) => {
			let cartDB: PGCartTable = new PGCartTable();
			await cartDB.InsertOrder({
				BookNo: req.body.bookNo,
				QuantityNo: req.body.quantityNo,
				FirstName: req.body.firstName,
				LastName: req.body.lastName,
				Email: req.body.email,
			}, res);
		});

		service.get('/books', async (req, res) => {
			let bookDB: PGBookTable = new PGBookTable();
			if(typeof req.query.title === "string")
			{
				await bookDB.SelectByName(req.query.title, res);
			}
			else
			{
				await bookDB.Select(res);
			}
		});

		service.get('/cart', async (req, res) => {
			let cartDB: PGCartTable = new PGCartTable();
				await cartDB.Select(res);
		});
		
		service.get('/books/:id', async (req, res) => {
			let bookDB: PGBookTable = new PGBookTable();
			await bookDB.SelectById(parseInt(req.params.id), res);
		});
			
		service.patch('/books/:id', async (req, res) => {
			let bookDB: PGBookTable = new PGBookTable();
			await bookDB.Patch({
				Id: parseInt(req.params.id),
				Title: req.body.title,
				Author: req.body.author,
				Price: req.body.price,
				Image: req.body.image,
			}, res);
		});
		
		service.delete('/books/:id', async (req, res) => {
			let bookDB: PGBookTable = new PGBookTable();
			await bookDB.Delete(parseInt(req.params.id), res);	
		});

		service.delete('/cart/:id', async (req, res) => {
			let cartDB: PGCartTable = new PGCartTable();
			await cartDB.Delete(parseInt(req.params.id), res);	
		});
		
		service.listen(this._port, () => console.log(`Example web service listening at http://localhost:${this._port}`));		
	}		
}	
	
(function ()
{
	(new WebserviceProcess()).Start();
})();