
exports.up = function(knex) {
  return knex.schema.createTable('instrutor', table => {
    table.string('id').primary()
    table.string('nome').notNullable()
    table.string('cpf').notNullable()
    table.string('endereco').notNullable()
    table.string('telefone').notNullable()
    table.string('email').notNullable().unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('instrutor')
};
