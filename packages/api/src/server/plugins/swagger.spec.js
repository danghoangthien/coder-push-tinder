import * as server from '../server'

describe('server/plugins/swagger', () => {
  it('GET /documentation', async() => {
    const instance = await server.compose()
    const response = await instance.inject({
      url: '/documentation',
      method: 'GET'
    })
    // @FIXME
    expect(response.statusCode).toBe(404)
  })
})
