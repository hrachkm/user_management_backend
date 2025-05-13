
import { client } from '../database/config.js';


export const getUsers = async() => {
    try {
        const users = (await client.query('select * from users')).rows;
        return users; 
    } catch (error) {
        console.error(error);
    }
}

export const getOneUser = async(userId) => {
    try {
        const user = (await client.query(`select * from users where id=${userId}`)).rows;
        return user[0]; 
    } catch (error) {
        console.error(error);
    }
}

export const addUser = async(payload) => {
    try {
        const userExists = (await client.query(`select * from users where email=$1`, [payload.email]));
        if(userExists.rows.length > 0) return false;
        const userAdded = (await client.query(
            `insert into users (nombre, email) values ($1, $2) returning *`,
            [payload.nombre, payload.email]
        )).rows;
        return userAdded[0]; 
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async(payload, userId) => {
    try {    
        const userUpdated = (await client.query(
            `update users
            set nombre=$2, email=$3, updated_At = NOW()
            where id=$1 returning *`,
            [userId, payload.nombre, payload.email]
        )).rows;
        return userUpdated[0]; 
    } catch (error) {
        console.error(error);
    }
}

export const removeOneUser = async(userId) => {
    try {
        const userRemoved = (await client.query(`delete from users where id=${userId} returning *`)).rows;
        return userRemoved[0]; 
    } catch (error) {
        console.error(error);
    }
}