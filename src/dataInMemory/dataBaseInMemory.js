let appointments = [];
let idCounter = 1;

module.exports = {
    getAll: () => appointments,
    getById: (id) => appointments.find(a => a.id === id),
    create: ({ client, car, service, data }) => {
        const novo = { id: idCounter++, client, car, service, data };
        appointments.push(novo);
        return novo;
    },
    remove: (id) => {
        const idx = appointments.findIndex(a => a.id === id);
        if (idx === -1) return false;
        appointments.splice(idx, 1);
        return true;
    }
};
