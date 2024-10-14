export const crearAuto = ({ marca, modelo, año, patente, asientos, baul, kilometraje, transmision, combustible }) => {
    return {
        marca,
        modelo,
        año,
        patente,
        asientos,
        baul,
        kilometraje,
        transmision,
        combustible,
        createdAt: new Date(),
    };
};
