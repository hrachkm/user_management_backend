
async function createUserTable(client){
    try {
        const res = await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                estado VARCHAR(10) DEFAULT 'inactivo' CHECK (estado IN ('activo', 'inactivo')),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE
            );
        `);
        console.info('Tabla "users" creada');

        // Verificar si ya existen usuarios
        const countResult = await client.query('SELECT COUNT(*) FROM users');
        const userCount = parseInt(countResult.rows[0].count, 10);

        //Crear usuarios
        if(userCount === 0){
            const usuariosEjemplo = [
                { nombre: 'Ana Pérez', email: 'ana.perez@example.com' },
                { nombre: 'Carlos López', email: 'carlos.lopez@example.com' },
                { nombre: 'Sofía Gómez', email: 'sofia.gomez@example.com' },
                { nombre: 'Mateo Vargas', email: 'mateo.vargas@example.com' },
                { nombre: 'Isabela Torres', email: 'isabela.torres@example.com' },
            ];
    
            for (const usuario of usuariosEjemplo) {
                try {
                    await client.query(
                    'INSERT INTO users (nombre, email) VALUES ($1, $2)',
                    [usuario.nombre, usuario.email]
                    );
                    console.info(`Usuario "${usuario.nombre}" insertado.`);
                } catch (err) {
                    console.error(`Error al insertar el usuario "${usuario.nombre}"`, err);
                }
            }
        }
    } catch (err) {
        console.error('Error al interactuar con la tabla "users"', err);
    }    
}

export default createUserTable;