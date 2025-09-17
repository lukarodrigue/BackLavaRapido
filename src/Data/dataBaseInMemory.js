let data = [];
let appointmenId = 1;

// Função para obter todos os agendamentos
function getAll() {
    return data;
}

// Função para obter um agendamento pelo ID
function getById(id) {
    return data.find(item => item.id === id);
}

// Função para criar um novo agendamento
function create(item) {
    const newAppointmen = { id: appointmenId++, ...item };
    
    data.push(newAppointmen);
    
    return newAppointmen;

}

// Função para remover um agendamento pelo ID
function remove(id) {
    const index = data.findIndex(appt => appt.id === id);

    if (index !== -1) {
        return data.splice(index, 1)[0];
    }
    return null;
}


module.exports = {
    getAll,
    getById,
    create,
    remove
};
