import { compose, initDb } from './server'
import logger from './logger'

// eslint-disable-next-line
(async() => {
  try {
    const server = await compose()
    await server.start()
    await initDb()
    logger.info(`Server is now listening to ${server.info.uri}`)
  } catch (err) {
    logger.error(`Error occurred when starting server: ${err.message}`)
    process.exit(1)
  }
})()

if (!module.parent) {
  process.on('unhandledRejection', err => {
    process.exitCode = 1
  })
}
