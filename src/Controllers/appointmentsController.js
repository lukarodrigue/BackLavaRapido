const knex = require("../database/knex");


class AppointmentsController {
    async create(request, response) {
        const { client, car, service, data } = request.body;


        if (!client || !car || !service || !data) {
            return response.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }

        try {

            const existingAppointment = await knex('appointments').where({ client }).first();

            if (existingAppointment) {
                return response.status(400).json({
                    error: "Cliente já possui um agendamento cadastrado."
                });
            }

            const [newAppointment] = await knex('appointments')
                .insert({
                    client,
                    car,
                    service,
                    data,
                })

            return response.status(201).json({ message: 'Agendamento criado com sucesso!' });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro interno ao criar agendamento." });
        }
    };

    async show(request, response) {
        const { id } = request.params;

        try {
            const appointmentShow = await knex("appointments")
                .where({ id })
                .first();

            if (!appointmentShow) {
                return response.status(404).json({ error: "Agendamento não encontrado." });
            }

            return response.status(200).json({ appointmentShow })

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao buscar agendamento." });
        };
    };

    async update(request, response) {
        const { id } = request.params;
        const { client, car, service, data } = request.body;

        const appointment = await knex("appointments").where({ id }).first();

        if (!appointment) {
            return response.status(404).json({ error: "Agendamento não encontrado." });
        }

        const appointmentUpdate = {
            client: client ?? appointment.client,
            car: car ?? appointment.car,
            service: service ?? appointment.service,
            data: data ?? appointment.data
        };

        await knex("appointments").where({ id }).update(appointmentUpdate);

        return response.status(200).json({ message: "Agendamento atualizado com sucesso." });

    };

    async delete(request, response) {
        const { id } = request.params;

        try {
            const appointmentDelete = await knex("appointments").where({ id }).first();

            if (!appointmentDelete) {
                return response.status(404).json({ error: "Agendamento não encontrado." });
            }

            await knex("appointments").where({ id }).delete();
            return response.status(200).json({ message: "Agendamento deletado com sucesso." });

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao deletar agendamento." });
        }
    };

};


module.exports = AppointmentsController;