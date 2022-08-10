import { Response } from "express-serve-static-core";
import {Client, Connection} from 'pg';
import format from 'pg-format';

export interface Cart
{
	Quantity: number,
	BookId: number,
}

export interface CartPatch
{
	Id: number,
	Quantity?: number,
    BookId?: number,
}

export interface Order
{
	BookNo: number,
	QuantityNo: number,
	FirstName: string,
	LastName: string,
	Email: string,
}

export interface OrderPatch
{
	CartId: number,
	BookNo?: number,
	QuantityNo?: number,
	FirstName?: string,
	Email?: string,
}

export class PGCartTable
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
    Insert = async (cart: Cart, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Adding item to cart`);
		try
		{
			await client.connect();
			
			let query: string = format('INSERT INTO "Cart"("Quantity", "BookId") VALUES(%L, %L)  RETURNING *', 
											cart.Quantity,
											cart.BookId,)
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
	}
	
	InsertOrder = async (order: Order, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Adding item to order`);
		try
		{
			await client.connect();
			
			let query: string = format('INSERT INTO "Order"("BookNo", "QuantityNo", "FirstName", "LastName", "Email") VALUES(%L, %L, %L, %L, %L)  RETURNING *', 
											order.BookNo,								
											order.QuantityNo,
											order.FirstName,
											order.LastName,
											order.Email,
											)
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
	}
	

	Select = async (res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Reading all the cart details`);
		try
		{
			await client.connect();
			
			let query: string = 'SELECT * FROM "Cart"';
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

	Delete = async (id: number, res: Response): Promise<void> =>
	{		
		let client: Client = this.GetClient();
		console.log(`Delete the cart with id = ${id}`);
		try
		{
			await client.connect();
			
			let query: string = format('DELETE FROM "Cart" WHERE "Id"=%L', id);
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
};