import path from 'path'
import Glue from '@hapi/glue'
import manifest from './manifest'
import knex from '../db'
import logger from '../logger'

const basedir = path.join(__dirname, '..')

export const compose = async() => {
  return Glue.compose(
    manifest,
    { relativeTo: basedir }
  )
}

export const initDb = async() => {
  logger.debug(`Start migrating/seeding ...`)
  await knex.migrate.latest()
  await knex.seed.run()
}
