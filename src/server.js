const dgram = require('dgram');
const config = require('./config');
const { queryServers } = require('./query');

const server = dgram.createSocket('udp4');
server.on('message', async (packet, rinfo)=> {
  const response = await queryServers(config.remoteServers, packet, { timeout: 10 * 1000 }); // queryServers() never rejects
  server.send(response, 0, response.length, rinfo.port, rinfo.address);
});

server.on('listening', ()=> console.log(`Listening on port 53`));
server.bind(53);
