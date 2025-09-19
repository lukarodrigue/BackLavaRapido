const appointments = require('../dataInMemory/dataBaseInMemory');

exports.getAllAppointments = (request, response) => {
    response.json(appointments.getAll());
};

exports.getAllAppointmentsById = (request, response) => {
    const { id } = request.params;
    const appt = appointments.getById(Number(id));

    if (!appt) {
        return response.status(404).json({ message: 'Agendamento não encontrado' });
    }

    response.json(appt);
}

exports.createAppointment = (request, response) => {
    const { client, car, service, data } = request.body;

    if(!client || !car || !service || !data) {
        return response.status(400).json({
            error: 'Campos obrigatórios não foram preenchidos'
        });
    };

    const novo = appointments.create({ client, car, service, data });

    response.status(201).json(novo);
}

exports.deleteAppointment = (request, response) => {
    const { id } = request.params;
    const removed = appointments.remove(Number(id)); 

    if (!removed) {
        return response.status(404).json({ message: 'Agendamento não encontrado' });
    }

    response.json({
        message: 'Agendamento removido com sucesso',
    });
};