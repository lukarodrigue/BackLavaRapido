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

            await knex('users').insert({ name, email, password, is_admin });
            return response.status(201).json({ message: "Usuário criado com sucesso." });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro interno ao criar usuário." });
        }
    };

    async update(request, response) {
        const { id ,name, email, password, old_password, is_admin } = request.body;
        const user_id = request.params.id;

        const user = await knex('users').where({ id: user_id }).first();

        if (!user) {
            return response.status(404).json({ error: "Usuário não encontrado." });
        }

        const userWithUpdateEmail = await knex('users').where({ email }).first();

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            return response.status(400).json({ error: "Este email já está em uso." });
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (!password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                return response.status(400).json({ error: "A senha antiga não confere." });
            }

            user.password = await hash(password, 8);

        } else if (password && !old_password) {
            return response.status(400).json({ error: "Você precisa informar a senha antiga." });
        }

        // if (is_admin !== undefined) {
        //     if (!request.user.is_admin) {
        //         return response.status(403).json({ error: "Você não tem permissão para alterar o campo is_admin." });
        //     }
        //     user.is_admin = is_admin;
        // }

        await knex('users')
            .where({ id: user.id })
            .update({
                name: user.name,
                email: user.email,
                password: user.password,
                is_admin: user.is_admin,
                updated_at: knex.fn.now()
            });

        return response.status(200).json({ message: "Usuário atualizado com sucesso!" });
    }

}

module.exports = UsersController;