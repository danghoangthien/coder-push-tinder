const fs = require('fs')
const os = require('os')
const path = require('path')
const { name } = require('./package.json')

const instances = os.cpus().length > 1 ? os.cpus().length - 1 : 1
const totalInstances = instances + 1
const memory = os.totalmem() / 1024 ** 3
const logdir = path.resolve(__dirname, 'logs')
const apiRunner = path.resolve(__dirname, 'src', 'runner.js')

if (!fs.existsSync(logdir)) {
  console.log('>>> API logs directory', logdir)
  fs.mkdirSync(logdir)
}

module.exports = {
  apps: [
    {
      name,
      script: apiRunner,
      watch: false,
      autorestart: true,
      max_memory_restart: `${Math.round(memory / totalInstances)}G`,
      node_args: ['--require=esm', '--require=dotenv/config'],
      error_file: path.resolve(logdir, 'api/err.log'),
      out_file: path.resolve(logdir, 'api/out.log'),
      merge_logs: true
    }
  ]
}
