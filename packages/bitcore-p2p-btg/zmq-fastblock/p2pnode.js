const zmq = require("zeromq")

var bitcore = require('bitcore-lib-btg');
const p2p = require('../');

const NETWORK = 'mainnet';
const opts = {
  // listenAddr: 'localhost:8380',
  // port: 8380,
  network: {
    ...bitcore.Networks.mainnet,
    port: 8380,
  },
  maxSize: 1,
  relay: false
};
const peerOpts = {
  host: 'localhost',
  port: 8338,
  network: NETWORK,
  relay: false,
};


let _zmqc;
function getZmqClient() {
  if (!_zmqc) {
    const sock = new zmq.Pull();
    sock.connect("tcp://127.0.0.1:5555")
    console.log("Worker connected to port 5555")
    _zmqc = sock;
  }
  return _zmqc;
  // for await (const [msg] of sock) {
  //   console.log("work: %s", msg.toString())
  // }
}

let _fbpeer;
async function fallbackPeer () {
  if (_fbpeer) {
    _fbpeer = new p2p.Peer(peerOpts);
    _fbpeer.connect();
    await new Promise((resolve, reject) => {
      peer.once('ready', () => resolve(peer));
      peer.once('error', () => reject(err));
    })
  }
  return _fbpeer;
}

const pool = new p2p.Pool(opts);
pool.on('getheaders', async (peer, message) => {
  const fbpeer = await fallbackPeer();
  fbpeer.once('headers', (headers) => {
    peer.sendMessage('headers', headers);
  })
  fbpeer.sendMessage('getheaders', message);
});
pool.on('getdata', async (peer, message) => {
  const inv = message.inventory;
  if (inv.type != p2p.Inventory.TYPE.BLOCK) {
    console.error(`Cannot handle INV type ${inv.type}. Ignoring...`);
  }
  const hash = inv.hash;
  // consume until meet the correct hash
  console.dir(message);
  // const zpeer = getZmqClient();
  // for await (const [msg] of sock) {
  //   console.log("work: %s", msg.toString());

  // }
});

pool.listen();

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// async function test() {
//   const zc = getZmqClient();
//   for await (const [msg] of zc) {
//     console.log("work: %s", msg.toString());
//     await new Promise((resolve) => {
//       readline.question('next?', () => {
//         resolve();
//       });
//     })
//   }
// }

// test();
