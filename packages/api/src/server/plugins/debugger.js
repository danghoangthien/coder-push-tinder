import logger from '../../logger'

export const plugin = {
  name: 'debugger',

  async register(server) {
    server.events.on('log', (event, tags) => {
      if (tags.error) {
          console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
      }
  });
    server.events.on('response', request => {
      logger.debug(
        `${request.info.remoteAddress} ${request.method.toUpperCase()} ${
          request.path
        } => ${request.response.statusCode}`
      )
    })
    server.events.on('route', (route) => {
        console.log(`New route added: ${route.path}`);
    });
  }
}
