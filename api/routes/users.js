import { Router } from 'express';
import {
    create_user,
    get_current_user,
    update_current_user
} from '../controllers/user_controller.js';
import { validate_new_user } from '../../utils/validate_input.js';

const users_router = Router();

users_router.post('/users/login', (req, res) => {
    res.send('Login a user');
});

users_router.post('/users', (req, res) => {
    const errors = validate_new_user(req.body);
    if (errors.errors.body.length > 0) {
        res.status(422).json(errors);
        return;
    }
    const { email, username, password } = req.body.user;
    create_user(email, username, password)
        .then((new_user) => {
            res.status(201).json(new_user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

users_router.get('/user', (req, res) => {
    get_current_user();
});

users_router.put('/user', (req, res) => {
    update_current_user();
});

export default users_router;