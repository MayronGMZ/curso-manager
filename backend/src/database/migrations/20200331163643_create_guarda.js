
exports.up = function(knex) {
  return knex.schema.createTable('guarda', table => {
    table.string('id').primary()
    table.string('nome').notNullable()
    table.string('cpf').notNullable()
    table.string('id_funcional').notNullable()
    table.string('data_nascimento').notNullable()
    table.string('endereco').notNullable()
    table.string('telefone').notNullable()
    table.string('email').notNullable().unique()
    table.string('curso_id').notNullable()
    table.string('data_inclusao').notNullable()
    table.string('observacao')

    //FK
    table.foreign('curso_id').references('id').inTable('curso')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('guarda')
};
