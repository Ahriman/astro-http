import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request, cookies }) => {

    const { slug } = params;

    const post = await getEntry('blog', slug as any );

    if ( !post ) {
        return new Response(JSON.stringify({ msg: `Post ${slug} not found` }), { 
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response( JSON.stringify( post ), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};



export const POST: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response( JSON.stringify({
        method: 'POST',
        ...body
    }), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const PUT: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response( JSON.stringify({
        method: 'PUT',
        ...body
    }), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const PATCH: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response( JSON.stringify({
        method: 'PATCH',
        ...body
    }), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const DELETE: APIRoute = async ({ params, request }) => {

    const { slug } = params;

    return new Response( JSON.stringify({
        method: 'DELETE',
        slug: slug
    }), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};






// export const OPTIONS: APIRoute = async ({ params, request }) => {

//     return new Response( JSON.stringify( post ), { 
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const HEAD: APIRoute = async ({ params, request }) => {

//     return new Response( JSON.stringify( post ), { 
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };


// export const TRACE: APIRoute = async ({ params, request }) => {

//     return new Response( JSON.stringify( post ), { 
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };


// export const CONNECT: APIRoute = async ({ params, request }) => {

//     return new Response( JSON.stringify( post ), { 
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };





// GET:

//     Propósito: Obtener información de un recurso.
//     Ejemplo: Obtener los detalles de un usuario.
//     No tiene efectos secundarios, es decir, es seguro y no modifica el estado del recurso.

// POST:

//     Propósito: Crear un nuevo recurso.
//     Ejemplo: Enviar los datos de un nuevo usuario para crear una cuenta.
//     Puede modificar el estado del servidor al crear nuevos recursos.

// PUT:

//     Propósito: Actualizar un recurso existente por completo.
//     Ejemplo: Actualizar todos los detalles de un usuario específico.
//     Sobrescribe el recurso con la nueva representación proporcionada.

// PATCH:

//     Propósito: Actualizar parcialmente un recurso.
//     Ejemplo: Actualizar solo el correo electrónico de un usuario.
//     Solo cambia los campos especificados en el recurso.

// DELETE:

//     Propósito: Eliminar un recurso.
//     Ejemplo: Eliminar la cuenta de un usuario.
//     Modifica el estado al eliminar el recurso del servidor.

// OPTIONS:

//     Propósito: Obtener información sobre las opciones de comunicación permitidas para un recurso.
//     Ejemplo: Saber qué métodos están permitidos en una URL.

// HEAD:

//     Propósito: Obtener los encabezados de un recurso, sin el cuerpo de la respuesta.
//     Ejemplo: Comprobar si un recurso existe sin descargar el contenido.

// TRACE:

//     Propósito: Realizar un seguimiento del camino que toma una solicitud hasta el servidor.
//     Ejemplo: Solucionar problemas con la ruta de la solicitud HTTP.

// CONNECT:

//     Propósito: Establecer una conexión de túnel hacia un servidor, generalmente para usar con proxies o conexiones seguras (SSL/TLS).