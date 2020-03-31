
exports.up = function(knex) {
  return knex.schema.createTable('curso', table => {
    table.string('id').primary()
    table.string('nome').notNullable()
    table.string('duracao').notNullable()
    table.string('modalidade').notNullable()
    table.string('turno').notNullable()
    table.string('local').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('curso')
};
