import { Client } from 'pg';

export const client = new Client({
    user: 'test',
    host: '127.0.0.1',
    database: 'user_management', // Reemplaza con el nombre de tu base de datos
    password: '123456', // Reemplaza con tu contraseña
    port: 5435,
});