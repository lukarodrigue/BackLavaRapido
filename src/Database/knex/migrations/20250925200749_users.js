exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();             // ID auto-incremento
    table.string("name").notNullable();           // Nome do usuário
    table.string("email").notNullable().unique(); // Email único
    table.string("password").notNullable();       // Senha (hash)
    table.boolean("is_admin").notNullable().defaultTo(false); // Admin ou não
    table.timestamps(true, true);                 // created_at e updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
