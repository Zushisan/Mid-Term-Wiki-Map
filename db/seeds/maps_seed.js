
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {id: 1, lat: 1000, long: 2000, title: 'Best points in maps', category: 'Sightseeing', user_id: 1},
        {id: 2, lat: 1000, long: 2000, title: 'Best place to eat', category: 'Food', user_id: 2},
        {id: 3, lat: 1000, long: 2000, title: 'Best movie theaters', category: 'Entertainment', user_id: 2},
        {id: 4, lat: 1000, long: 2000, title: 'Best stuff to do', category: 'Entertainment', user_id: 1},
        {id: 5, lat: 1000, long: 2000, title: 'Best stores', category: 'Random', user_id: 1},
        {id: 6, lat: 1000, long: 2000, title: 'Best random', category: 'Random', user_id: 3}
      ]);
    });
};
