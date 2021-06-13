import path from 'path'
import settings from '../settings'
import { CreateBindModel } from './model'

let seedDir = path.join(__dirname, './seeds', 'default')

export const config = {
  client: settings.db.client,
  connection: {
    host: settings.db.host,
    port: settings.db.port,
    user: settings.db.user,
    password: settings.db.password,
    database: settings.db.name
  },
  migrations: {
    directory: path.join(__dirname, './migrations')
  },
  seeds: {
    directory: seedDir
  }
}

const knex = require('knex')(config)

const User = new CreateBindModel('User', knex)
const Interaction = new CreateBindModel('Interaction', knex, { id: ['baseUser', 'targetUser'] })

const models = {
  User,
  Interaction
}

export { models }

export const fields = {
  // example: ['']
}

export default knex
