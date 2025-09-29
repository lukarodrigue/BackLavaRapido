const knex = require('../database/knex');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const authConfig = require('../auth/authConfig');


class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex('users').where({ email }).first();

        if (!user) {
            return response.status(401).json({ message: 'Email e/ou senha incorretos' });
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            return response.status(401).json({ message: 'Email e/ou senha incorretos' });
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        })

        return response.json({
            user, token
        })
    }
}

module.exports = SessionsController;