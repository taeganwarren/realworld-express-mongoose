import { Router } from 'express';

const user_router = Router();

user_router.post('/', function (req, res) {
    res.send('Create user');
});

user_router.get('/', function (req, res) {
    res.send('Read user');
});

user_router.put('/', function (req, res) {
    res.send('Edit user');
});

export default user_router;