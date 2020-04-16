const { encode, decode, RECURSION_DESIRED } = require('dns-packet');
const { queryServers, queryServer } = require('../src/query');

const packet = encode({
  type: 'query',
  id: 1,
  flags: RECURSION_DESIRED,
  questions: [{ type: 'A', name: 'google.com' }]
});

const options = { timeout: 10 * 1000 };

test('Query HTTP', async ()=> {
  const response = decode(await queryServers(['https://cloudflare-dns.com/dns-query'], packet, options));
  expect(response.answers.length).toBeGreaterThan(0);
});

test('Query HTTP Error', async ()=> {
  await expect(queryServer('https://www.google.com/abcd', packet, options)).rejects.toEqual(new Error('Not Found'));
});

test('Query UDP', async ()=> {
  const response = decode(await queryServers(['1.1.1.1'], packet, options));
  expect(response.answers.length).toBeGreaterThan(0);
});

test('Query UDP Error', async ()=> {
  await expect(queryServer('1.1.1.1', packet, { timeout: 1 })).rejects.toEqual(new Error(`Connection to 1.1.1.1 timed out`));
});

test('Query Invalid Server', async ()=> {
  await expect(queryServer(null, null, { timeout: 0 })).rejects.toEqual(new Error(`Invalid Remote Server`));
});

test('Multiple Query Errors', async ()=> {
  await expect(queryServers(['https://subashpathak.com/404.htlm', 'https://subashpathak.com/404.htlm'], packet, options)).rejects.toEqual(new Error(`Not Found`));
});
