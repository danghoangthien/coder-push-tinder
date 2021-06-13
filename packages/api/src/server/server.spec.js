import * as server from './server'

describe('server', () => {
  it('server.compose()', async() => {
    const instance = await server.compose()
    const response = await instance.inject({
      url: '/notfound',
      method: 'GET',
      payload: { foo: 'bar' }
    })
    expect(response.statusCode).toBe(404)
  })
})
