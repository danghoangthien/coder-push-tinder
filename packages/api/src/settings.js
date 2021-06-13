const { env } = process

export default {
  host: env.API_HOST || '0.0.0.0',
  port: env.API_PORT|| '3000',
  prefix: '/api/v1',
  db: {
    client: env.DB_CLIENT || 'pg',
    host: env.DB_HOST || '0.0.0.0',
    port: env.DB_PORT || '3306',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    name: env.DB_NAME || 'tinder'
  }
}