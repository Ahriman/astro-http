import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const posts = await getCollection('blog');

    const url = new URL( request.url );

    const slug = url.searchParams.get('slug');

    console.log(slug)
    console.log(url);
    console.log(request);

    if ( slug ) {
        const post = await getEntry('blog', slug );

        if ( post ) {
            return new Response( JSON.stringify(post), { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify({ msg: `Post ${slug} not found` }), { 
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    


    return new Response( JSON.stringify(posts), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};