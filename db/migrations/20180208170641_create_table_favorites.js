

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_map_favorite', function(table){
      table.integer('map_id').references('id').inTable('maps');
      table.integer('user_id').references('id').inTable('users');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_map_favorite')
  ])
};

