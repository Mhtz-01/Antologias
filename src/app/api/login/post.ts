import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const targetUrl = 'https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json';
    
    // CORS headers can be set here if necessary
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const body = await req.json(); // Parse incoming JSON from request

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        // Return the response from the external API
        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function OPTIONS(req: NextRequest) {
    // Handling pre-flight OPTIONS request for CORS
    return NextResponse.json({}, { status: 200 });
}
