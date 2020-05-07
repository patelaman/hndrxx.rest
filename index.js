addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    const quotes = JSON.parse(
        await (await fetch('https://raw.githubusercontent.com/patelaman/hndrxx.rest/quotes/quotes.json')).text());
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    var header = request.headers.get('Content-Type')
    if (header === 'application/json') {
        return new Response(JSON.stringify({ quote: randomQuote }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } else {
        return new Response(randomQuote, {
            headers: { 'Content-Type': 'text/html' },
        })
    }
}