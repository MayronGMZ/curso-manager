
exports.up = function(knex) {
  return knex.schema.createTable('disciplina', table => {
    table.string('id').primary()
    table.string('nome').notNullable()
    table.string('instrutor_id').notNullable()
    table.string('curso_id').notNullable()
    table.string('carga_horaria').notNullable()

    // FK
    table.foreign('instrutor_id').references('id').inTable('instrutor')
    table.foreign('curso_id').references('id').inTable('curso')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('disciplina')
};
