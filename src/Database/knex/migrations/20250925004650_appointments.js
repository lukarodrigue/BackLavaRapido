exports.up = function(knex) {
  return knex.schema.createTable('appointments', function(table) {
    table.increments('id').primary();         // ID auto-incremento
    table.string('client').notNullable();     // Nome do cliente
    table.string('car').notNullable();        // Carro
    table.string('service').notNullable();    // Serviço
    table.datetime('data').notNullable();     // Data do agendamento
    table.timestamps(true, true);             // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};
