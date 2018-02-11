
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('maps', function(table){
      table.increments();
      table.string('lat');
      table.string('long');
      table.string('title');
      table.string('category');
      table.integer('user_id').references('id').inTable('users');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('maps')
  ])
};
