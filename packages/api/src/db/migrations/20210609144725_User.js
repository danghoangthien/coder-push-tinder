const tableName = 'User'

exports.up = knex => {
  return Promise.all([
    knex.schema.hasTable(tableName).then(exists => {
      if (!exists) {
        return knex.schema.createTable(tableName, table => {
          table.specificType('id', 'CHAR(24)').primary()
          table.enu('title', ['mr', 'ms', 'mrs', 'miss', 'dr', ''], { useNative: true, enumName: 'user_titles' })
          table.string('firstName').notNullable()
          table.string('lastName').notNullable()
          table.enu('gender', ['male', 'female', 'other', ''], { useNative: true, enumName: 'genders' })
          table.string('email').unique()
          table.datetime('dateOfBirth').notNullable()
          table.datetime('registerDate').defaultTo(knex.fn.now())
          table.string('phone')
          table.string('picture')
          table.string('location')
          table.datetime('createdAt').defaultTo(knex.fn.now())
          table.datetime('updatedAt').defaultTo(knex.fn.now())
          table.index(['id'])
        })
      }
    })
  ])
}

exports.down = knex => {
  return Promise.all([knex.schema.dropTableIfExists(tableName)])
}
