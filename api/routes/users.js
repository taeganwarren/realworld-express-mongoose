import { Router } from 'express';
import {
    create_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';
import validate_user_input from '../middlewares/validate_input.js';

const users_router = Router();

users_router.post('/users/login', validate_user_input({fields: ['email', 'password']}), (req, res) => {
    const { email, password } = req.body.user;
    get_user(email, password)
        .then((existing_user) => {
            if (existing_user.errors) {
                return res.status(422).json(existing_user);
            }
            return res.status(200).json(existing_user);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

users_router.post('/users', validate_user_input({fields: ['username', 'email', 'password']}), (req, res) => {
    const { email, username, password } = req.body.user;
    create_user(email, username, password)
        .then((new_user) => {
            return res.status(201).json(new_user);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

users_router.get('/user', (req, res) => {
    get_user();
});

users_router.put('/user', (req, res) => {
    update_user();
});

export default users_router;