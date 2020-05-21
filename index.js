addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    const url = new URL(request.url);
    const quotes = JSON.parse(
        await (await fetch('https://raw.githubusercontent.com/patelaman/hndrxx.rest/quotes/quotes.json')).text())
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    if (url.searchParams.get('format')) {
        let formatParameter = url.searchParams.get('format').toLocaleLowerCase().split('/')[0]
        if (formatParameter === 'text') {
            return new Response(randomQuote, {
                headers: { 
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                },
            })
        }
    }

    return new Response(JSON.stringify({ quote: randomQuote }), {
        headers: { 
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        },
    })
}