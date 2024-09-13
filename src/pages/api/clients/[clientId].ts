import { cli } from "@astrojs/db";
import type { APIRoute } from "astro";
import { db, eq, Clients } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? '';

    // const { id, ...body } = await request.json();

    const clients = await db.select().from(Clients).where(eq(Clients.id, +clientId));

    console.log(clients);

    if ( clients.length === 0) {
        return new Response( JSON.stringify({ msg: `Client with id ${clientId} not found` }), { 
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return new Response( JSON.stringify(clients.at(0)), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const PATCH: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? '';

    try {
        const { id, ...body } = await request.json(); 

        const results = await db.update(Clients).set(body).where(eq(Clients.id, +clientId));

        const updateClient = await db.select().from(Clients).where(eq(Clients.id, +clientId));

        return new Response( JSON.stringify(updateClient.at(0)), { 
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
        return new Response( JSON.stringify( { msg: 'No body found'} ), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
};

export const POST: APIRoute = async ({ params, request }) => {

    try {
        const { id, ...body } = await request.json(); 

        const { lastInsertRowid } = await db.insert(Clients).values(body);

        return new Response( JSON.stringify({
            id: +lastInsertRowid!?.toString(),
            ...body,
        }), { 
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
        return new Response( JSON.stringify( { msg: 'No body found'} ), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
};



export const DELETE: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? '';

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId));

    if ( rowsAffected > 0 ) {
        return new Response( JSON.stringify({ msg: 'Deleted' }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response( JSON.stringify({ msg: `Client with id ${clientId} not found` }), { 
        status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};