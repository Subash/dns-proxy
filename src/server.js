const { encode, decode } = require('dns-packet');
const dgram = require('dgram');
const config = require('./config');
const { queryServers } = require('./query');

const server = dgram.createSocket('udp4');
server.on('message', async (packet, rinfo)=> {
  let request = decode(packet);

  let response;
  try {
    response = await queryServers(config.remoteServers, packet, { timeout: 30 * 1000 });
  } catch (err) {
    console.log(err.message);
    response = encode({ type: 'response', id: request.id, flags: 2, questions: request.questions }); // flag 2 is SERVFAIL; https://serverfault.com/a/827108
  }

  server.send(response, 0, response.length, rinfo.port, rinfo.address);
});

server.on('listening', ()=> console.log(`Listening on port 53`));
server.bind(53);
