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
        origin: ['*'],
        additionalHeaders: ['base_user_id']
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
        plugin: './server/plugins/debugger'
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
