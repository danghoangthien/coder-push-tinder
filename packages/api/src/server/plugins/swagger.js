import inert from 'inert'
import vision from 'vision'
import swagger from 'hapi-swagger'

const version = 'v2'

export const plugin = {
  name: 'swagger',

  async register(server) {
    await server.register([
      inert,
      vision,
      {
        plugin: swagger,
        options: {
          info: {
            version,
            title: 'Coder Push Tinder App Docs'
          }
        }
      }
    ])
  }
}
