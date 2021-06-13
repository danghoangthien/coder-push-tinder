const tableName = 'Interaction'

exports.up = knex => {
  return Promise.all([
    knex.schema.hasTable(tableName).then(exists => {
      if (!exists) {
        return knex.schema.createTable(tableName, table => {
          table.specificType('baseUser', 'CHAR(24)')
          table.specificType('targetUser', 'CHAR(24)')
          table.enu('reaction', ['like', 'pass'], { useNative: true, enumName: 'user_reactions' })
          table.primary(['baseUser', 'targetUser'])
        })
      }
    })
  ])
}

exports.down = knex => {
  return Promise.all([knex.schema.dropTableIfExists(tableName)])
}
