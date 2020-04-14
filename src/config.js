const split = str=> str.split(',').map(item=> item.trim())

module.exports = {
  remoteServers: split(process.env.REMOTE_SERVERS || 'https://cloudflare-dns.com/dns-query')
};
