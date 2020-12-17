// Necessary pairs:
// {"code":"USD","name":"US Dollar","rate": _}
// {"code":"BTC","name":"Bitcoin","rate": _}

const BTG_ID = 'bitcoin-gold';
const USD_ID = 'usd';
const RATE_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${BTG_ID}&vs_currencies=${USD_ID}`;

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
})

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
      "content-type": "application/json;charset=UTF-8"
    }
  });
}
