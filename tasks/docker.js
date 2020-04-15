const ora = require('ora');
const path = require('path');
const run = require('@sbspk/run');
const ROOT_DIR = path.resolve(__dirname, '../');

async function getTag() {
  return `subash/dns-proxy:${process.arch === 'arm' ? 'pi': 'latest'}`;
}

async function build() {
  const tag = await getTag();
  const spinner = ora(`Building container ${tag}`).start();
  await run(`docker build -t ${tag} .`, { cwd: ROOT_DIR });
  spinner.succeed(`Built container ${tag}`);
}

async function push() {
  const tag = await getTag();
  const spinner = ora(`Pushing container ${tag}`).start();
  await run(`docker push ${tag}`, { cwd: ROOT_DIR });
  spinner.succeed(`Pushed container ${tag}`);
}

async function runContainer() {
  const tag = await getTag();
  await run(`docker run --env REMOTE_SERVERS=https://cloudflare-dns.com/dns-query -p 53:53/udp ${tag}`, { cwd: ROOT_DIR, stdio: 'inherit' });
}

module.exports = { build, push, run: runContainer };
