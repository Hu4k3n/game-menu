// Local stand-in for the real /api/ask backend, so the AskBar can be exercised
// without wiring up a model provider. Not for production use.
const http = require('http');

const PORT = process.env.PORT || 8787;
const ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
        res.writeHead(204).end();
        return;
    }

    if (req.method !== 'POST' || !req.url.startsWith('/api/ask')) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'not found' }));
        return;
    }

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 10_000) {
            req.destroy();
        }
    });

    req.on('end', () => {
        let question = '';
        try {
            question = JSON.parse(body).question ?? '';
        } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'invalid json' }));
            return;
        }

        const answer = [
            `You asked: "${question}"`,
            '',
            'This is a mock answer standing in for the model response. Replace this server',
            'with your own backend that holds the provider key and calls the model, then',
            'point REACT_APP_ASK_API_URL at it.',
        ].join('\n');

        // A short delay makes the loading state and the expand animation observable.
        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ answer }));
        }, 700);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`mock ask server listening on http://127.0.0.1:${PORT}/api/ask`);
});
