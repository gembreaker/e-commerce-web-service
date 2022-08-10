import express from 'express';
import { Response } from "express-serve-static-core";
import {Client, Connection} from 'pg';
import format from 'pg-format';
// import pool from './pgpool';

export interface Book
{
	Title: string,
	Author: string,
	Price: string,
	Image: string,
}

export interface BookPatch
{
	Id: number,
	Title?: string,
	Author?: string,
	Price?: string,
	Image?: string,
}

export class PGBookTable
{
	private GetClient(): Client
	{
		return new Client({
			host: "postgres",		// Service name in docker-compose
			port: 5432,
			user: "docker",
			password: "password",
			database: "mydb"
		});	
	}
	
	Insert = async (book: Book, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Adding new book named ${book.Title}`);
		try
		{
			await client.connect();
			
			let query: string = format('INSERT INTO "Book"("Title", "Author", "Price", "Image") VALUES(%L, %L, %L, %L)  RETURNING *', 
											book.Title,
											book.Author,
											book.Price,
											book.Image);
			let results = await client.query(query);
			
			if(results.rowCount > 0)
			{
				console.log('New record added');
				res.status(201).send(results.rows[0]);
			}
			else
			{
				res.status(409).end();
			}			
		}
		catch(error)
		{
			console.log(error);
			res.status(403).send(error);
		}
		finally
		{
			await client.end();
		}	
	};
	
	Select = async (res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Reading all the books details`);
		try
		{
			await client.connect();
			
			let query: string = 'SELECT * FROM "Book"';
			let results = await client.query(query);
			
			if(results.rows.length > 0)
				console.log(`Read ${results.rows.length} records`)
			else
				console.log(`Database is empty`);
			
			res.send(results.rows);
		}
		catch(error)
		{
			console.log(error);
			res.status(403).send(error);
		}
		finally
		{
			await client.end();
		}	
	};
	
	SelectById = async (id: number, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Looking for the book with id ${id}`);
		try
		{
			await client.connect();
			
			let query: string = format('SELECT * FROM "Book" WHERE "Id"=%L', id);
			let results = await client.query(query);
			
			if(results.rows.length > 0)
			{
				console.log(`Found ${results.rows.length} records`);
				res.send(results.rows[0]);
			}
			else
			{
				console.log(`Record not found for Id=${id}`);
				res.status(409).end();
			}
		}
		catch(error)
		{
			console.log(error);
			res.status(403).send(error);
		}
		finally
		{
			await client.end();
		}
	};
	
	SelectByName = async (title: string, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Looking for all the books with the title ${title}`);
		try
		{
			await client.connect();
			
			let query: string = format('SELECT * FROM "Book" WHERE "Title"=%L', title);
			let results = await client.query(query);
			
			if(results.rows.length > 0)
				console.log(`Found ${results.rows.length} records`);
			else
				console.log(`Records not found for ${title}`);
			
			res.send(results.rows);
		}
		catch(error)
		{
			console.log(error);
			res.status(403).send(error);
		}
		finally
		{
			await client.end();
		}	
	};
	
	Delete = async (id: number, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Delete the book with id = ${id}`);
		try
		{
			await client.connect();
			
			let query: string = format('DELETE FROM "Book" WHERE "Id"=%L', id);
			let results = await client.query(query);
			
			if(results.rowCount > 0)
			{
				console.log('Record deleted');
				res.send({});
			}
			else
			{
				console.log(`Failed to delete record for Id = ${id}`);
				res.status(409).end();
			}			
		}
		catch(error)
		{
			console.log(error);
			res.status(400).send(error);
		}
		finally
		{
			await client.end();
		}	
	};
	
	Patch = async (book: BookPatch, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Modifying the book with Id = ${book.Id}`);
		try
		{
			//let query: string = 'UPDATE "Book" SET ';
			let queryArgs: string[] = [];
			let values: any[] = [];
			await client.connect();
			if(book.Title != null) { values.push(book.Title); queryArgs.push('"Title"=%L'); }
			if(book.Author != null) { values.push(book.Author); queryArgs.push('"Author"=%L'); }
			if(book.Price != null) { values.push(book.Price); queryArgs.push('"Price"=%L'); }
			if(book.Image != null) { values.push(book.Image); queryArgs.push('"Price"=%L'); }
			values.push(book.Id);  // Id of record to change
	
			let query: string = format.withArray('UPDATE "Book" SET ' + queryArgs.join(",") + ' WHERE "Id"=%L', 
											values);
			let results = await client.query(query);
			
			if(results.rowCount > 0)
			{
				console.log('Modified the record');
				res.send({});
			}
			else
			{
				console.log(`Failed to modify record for Id = ${book.Id}`);
				res.status(409).end();
			}			
		}
		catch(error)
		{
			console.log(error);
			res.status(403).send(error);
		}
		finally
		{
			await client.end();
		}		
	};	
}