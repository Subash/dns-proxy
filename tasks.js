#!/usr/bin/env node
const docker = require('./tasks/docker');
const run = require('@sbspk/run');
const task = process.argv[2];

(async()=> {
  switch(task) {
    case 'docker:build':
      await docker.build();
      break;
    case 'docker:push':
      await docker.push();
      break;
    case 'docker:run':
      await docker.run();
      break;
    case 'docker:release':
      await docker.build();
      await docker.push();
      break;
    case 'test':
      await run('jest', { stdio: 'inherit' })
      break;
    case 'start-dev':
      await run('sudo node src/server.js', { stdio: 'inherit' })
      break;
    default:
      console.log('Invalid Task!');
      process.exit(1);
  }
})();
