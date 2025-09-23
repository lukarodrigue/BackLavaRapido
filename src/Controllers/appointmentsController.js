const sqliteConnection = require("../database/sqlite3");


class AppointmentsController {
    static async create(request, response) {
        const { client, car, service, data } = request.body;

        if (!client || !car || !service || !data) {
            return response.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }

        try {
            const database = await sqliteConnection();

            //verifica se já existe um agendamento para o mesmo cliente
            const existingClient = await database.get(
                "SELECT * FROM appointments WHERE client = ?",
                [client]
            );

            if (existingClient) {
                return response.status(400).json({
                    error: "Cliente já está agendado, rever o agendamento cadastrado."
                });
            }

            // Se não existir, cria o agendamento
            await database.run(
                "INSERT INTO appointments (client, car, service, data) VALUES (?, ?, ?, ?)",
                [client, car, service, data]
            );

            return response
                .status(201)
                .json({ message: "Agendamento criado com sucesso!" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao criar agendamento." });
        }
    }

    static async show(request, response) {
        const { id } = request.params;
        const database = await sqliteConnection();

        try {
            const appt = await database.get(
                "SELECT * FROM appointments WHERE id = ?",
                [id]
            );

            if(!appt) {
                return response.status(404).json({ error: "Agendamento não encontrado." });
            }

            return response.json(appt);


        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao buscar agendamento." });
        }
    }
}

module.exports = AppointmentsController;
