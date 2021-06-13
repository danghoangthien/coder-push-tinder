import path from 'path'
import Glue from '@hapi/glue'
import manifest from './manifest'
import knex from '../db'

const basedir = path.join(__dirname, '..')

export const compose = async() => {
  return Glue.compose(
    manifest,
    { relativeTo: basedir }
  )
}

export const initDb = async() => {
  await knex.migrate.latest()
  await knex.seed.run()
}
