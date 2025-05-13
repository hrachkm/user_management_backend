import { Router } from 'express';

import { getUsers, getOneUser, addUser, updateUser, removeOneUser } from '../services/users.js';

const router = Router();

//Obtener todos los usuarios
router.get('/users', async (req, res) => {
    const users = await getUsers();
    res.jsonp(users);
});

//Obtener un usuario
router.get('/users/:id', async (req, res) => {
    const user = await getOneUser(req.params.id);
    res.jsonp(user);
});

//Agregar un usuario
router.post('/users', async (req, res) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(req.body.email);
        if(!req.body.nombre) throw new Error('El nombre no debe estar vacio');
        if(!req.body.email) throw new Error('El correo no debe estar vacio');
        if(!isValidEmail) throw new Error('El correo es inválido');
        const userAdded = await addUser(req.body);
        if(!userAdded) throw new Error('El usuario ya existe');

        res.jsonp(userAdded);
    } catch (error) {
        console.error(error.message);
        res.status(404).jsonp({msg: error.message});
    }
});

//Actualizar un usuario
router.put('/users/:id', async (req, res) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(req.body.email);
        if(!req.body.nombre) throw new Error('El nombre no debe estar vacio');
        if(!req.body.email) throw new Error('El correo no debe estar vacio');
        if(!isValidEmail) throw new Error('El correo es inválido');
        const userUpdated = await updateUser(req.body, req.params.id);

        res.jsonp(userUpdated);
    } catch (error) {
        console.error(error.message);
        res.status(404).jsonp({msg: error.message});
    }
});

//Borrar un usuario
router.delete('/users/:id', async (req, res) => {
    const userDeleted = await removeOneUser(req.params.id);
    res.jsonp(userDeleted);
});

export default router;