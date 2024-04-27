import { Router } from 'express';

const users_router = Router();

users_router.post('/login', function (req, res) {
    res.send('Login a user');
});

users_router.post('/', function (req, res) {
    res.send('Create a user');
});

users_router.get('/', function (req, res) {
    res.send('Read a user');
});

users_router.put('/', function (req, res) {
    res.send('Edit a user');
});

export default users_router;