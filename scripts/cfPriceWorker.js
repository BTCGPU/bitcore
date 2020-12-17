// Necessary pairs:
// {"code":"USD","name":"US Dollar","rate": _}
// {"code":"BTC","name":"Bitcoin","rate": _}

const BTG_ID = 'bitcoin-gold';
const USD_ID = 'usd';
const RATE_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${BTG_ID}&vs_currencies=${USD_ID}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

addEventListener("fetch", event => {
  if (event.request.method === "OPTIONS") {
    event.respondWith(handleOptions(event.request))
  } else {
    event.respondWith(handleRequest(event.request));
  }
});

async function fetchData() {
  const resp = await fetch(RATE_URL, { cf: { cacheTtl: 60 } });
  const data = await resp.json();
  const btgRate = data[BTG_ID][USD_ID];
  return [{
    code: 'USD',
    name: 'US Dollar',
    rate: btgRate
  }];
}

async function handleRequest(request) {
  const data = await fetchData();
  return new Response(JSON.stringify(data), {
    headers: {
      ...corsHeaders,
      "content-type": "application/json;charset=UTF-8"
    }
  });
}

function handleOptions(request) {
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ){
    let respHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
    }

    return new Response(null, {
      headers: respHeaders,
    })
  }
  else {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    })
  }
}
