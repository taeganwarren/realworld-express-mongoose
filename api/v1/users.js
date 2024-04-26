import { Router } from 'express';

const users_router = Router();

users_router.post('/users/login', function (req, res) {
    res.send('Login a user');
});

users_router.post('/users', function (req, res) {
    res.send('Create a user');
});

users_router.get('/user', function (req, res) {
    res.send('Read a user');
});

users_router.put('/user', function (req, res) {
    res.send('Edit a user');
});

export default users_router;