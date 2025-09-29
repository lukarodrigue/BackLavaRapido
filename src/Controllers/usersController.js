const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UsersController {
    async create(request, response) {
        const { name, email, password, is_admin = false } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }

        try {
            const existingUser = await knex('users').where({ email }).first();

            if (existingUser) {
                return response.status(400).json({
                    error: " email já cadastrado."
                });
            }

            const hashedPassword = await hash(password, 8);

            await knex('users').insert(
                {
                    name,
                    email,
                    password: hashedPassword,
                    is_admin
                });
            return response.status(201).json({ message: "Usuário criado com sucesso." });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro interno ao criar usuário." });
        }
    };

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        try {
            const user = await knex('users').where({ id }).first();

            if (!user) {
                return response.status(404).json({ error: "Usuário não encontrado." });
            }

            if (email) {
                const userWithUpdateEmail = await knex('users').where({ email }).first();
                if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
                    return response.status(400).json({ error: "Este email já está em uso." });
                }
            }

            user.name = name ?? user.name;
            user.email = email ?? user.email;


            if (password) {
                if (!old_password) {
                    return response.status(400).json({ error: "Você precisa informar a senha antiga para definir uma nova." });
                }

                const checkOldPassword = await compare(old_password, user.password);


                if (checkOldPassword === false) {
                    return response.status(400).json({ error: "A senha antiga não confere." });
                }

                user.password = await hash(password, 8);

            }

            await knex('users')
                .where({ id })
                .update({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    updated_at: knex.fn.now()
                });

            return response.status(200).json({ message: "Usuário atualizado com sucesso!" });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Ocorreu um erro interno ao atualizar o usuário." });
        }
    }

}

module.exports = UsersController;