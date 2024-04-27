import { Router } from 'express';

const users_router = Router();

users_router.post('/users/login', function (req, res) {
    res.json({'message': 'Login a user'});
});

users_router.post('/users', function (req, res) {
    res.json({'message': 'Create a user'});
});

users_router.get('/user', function (req, res) {
    res.json({'message': 'Get a user'});
});

users_router.put('/user', function (req, res) {
    res.json({'message': 'Edit a user'});
});

export default users_router;