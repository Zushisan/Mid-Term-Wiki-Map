
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('points', function(table){
      table.increments();
      table.integer('lat');
      table.integer('long');
      table.string('title');
      table.string('description');
      table.string('img');
      table.integer('map_id').references('id').inTable('maps');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('points')
  ])
};
