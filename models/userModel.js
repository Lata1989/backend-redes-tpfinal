export const crearUsuario = (nombre, apellido, dni, email, password) => {
    return {
        nombre,
        apellido,
        dni,
        email,
        password,
        createdAt: new Date(),
    };
};
