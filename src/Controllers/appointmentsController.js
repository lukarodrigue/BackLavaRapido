const sqliteConnection = require("../database/sqlite3");

class AppointmentsController {
     static async create(request, response) {
        const { client, car, service, data, } = request.body;

        if (!client || !car || !service || !data) {
            return response.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }
        try {
            const database = await sqliteConnection();
            await database.run(
                "INSERT INTO appointments (client, car, service, data) VALUES (?, ?, ?, ?)",
                [client, car, service, data]
            );
            return response.status(201).json({ message: "Agendamento criado com sucesso!" });
        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar agendamento." });
        }
    }
}
module.exports = AppointmentsController;