const knex = require("../database/knex");


class UsersController {
    async create(request, response) {
        const { name, email, password, is_admin = false } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }

        try {
            const existingUser = await knex('users').where({ email, name }).first();

            if (existingUser) {
                return response.status(400).json({
                    error: "Usuário já cadastrado."
                });
            }

            await knex('users').insert({ name, email, password, is_admin });
            return response.status(201).json({ message: "Usuário criado com sucesso." });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro interno ao criar usuário." });
        }
    };
}

module.exports = UsersController;