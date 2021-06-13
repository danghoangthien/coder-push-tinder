import settings from '../settings'

export default {
  server: {
    host: settings.host,
    port: settings.port,
    cache: 'catbox-memory',
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*']
      },
      security: {
        hsts: true,
        xss: true,
        noOpen: true,
        noSniff: true,
        xframe: true
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require('@hapi/scooter')
      },
      {
        plugin: require('@hapi/nes'),
        options: {
          auth: false
        }
      },
      {
        plugin: './server/plugins/swagger'
      },
      {
        plugin: './apps/user',
        routes: {
          prefix: settings.prefix
        }
      }
    ]
  }
}
