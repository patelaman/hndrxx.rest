addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    // get quotes from http request
    // parse json out
    // assign random quote
    var header = request.headers.get('Content-Type')
    if (header === 'application/json') {
        return new Response(JSON.stringify(cache), {
            headers: { 'Content-Type': 'application/json' },
        })
    } else {
        return new Response(cache, {
            headers: { 'Content-Type': 'text/html' },
        })
    }
}