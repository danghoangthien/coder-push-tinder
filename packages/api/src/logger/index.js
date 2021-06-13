import pino from 'pino'

const { env } = process

export default pino({
  name: process.env.npm_package_name,
  level: env.LOG_LEVEL || 'debug',
  prettyPrint: {
    colorize: true,
    levelFirst: false,
    translateTime: true,
    ignore: 'pid,hostname'
  }
})
