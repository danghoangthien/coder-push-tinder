import { ObjectId } from 'bson'
import moment from 'moment'
import * as objection from 'objection'

export const Key = () => new ObjectId().toHexString()

function createModel(TableName, options = {}) {
  class Model extends objection.Model {
    async $beforeUpdate(query, context) {
      await super.$beforeUpdate(query, context)
      const isUpdatedAtExisted = await this.$knex().schema.hasColumn(
        this.constructor.name,
        'updatedAt'
      )
      if (isUpdatedAtExisted) {
        this.updatedAt = moment().toDate()
      }
    }

    async $beforeInsert(context) {
      await super.$beforeInsert(context)
      if (!this.id) {
        this.id = Key()
      }
      const isCreatedAtExisted = await this.$knex().schema.hasColumn(
        this.constructor.name,
        'createdAt'
      )
      if (isCreatedAtExisted) {
        this.createdAt = moment().toDate()
      }
      const isUpdatedAtExisted = await this.$knex().schema.hasColumn(
        this.constructor.name,
        'updatedAt'
      )
      if (isUpdatedAtExisted) {
        this.updatedAt = moment().toDate()
      }
    }

    static get tableName() {
      return TableName
    }

    static get relationMappings() {
      return options.relations || {}
    }

    static get jsonAttributes() {
      return options.jsonAttributes || []
    }

    static get idColumn() {
      return options.id || 'id'
    }
  }
  return Model
}

export class CreateBindModel {
  constructor(table, tenant, options = {}) {
    const model = createModel(table, options)
    return model.bindKnex(tenant)
  }
}
