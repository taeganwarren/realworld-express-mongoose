import { Router } from 'express';
import {
    create_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';
import {
    check_input 
} from '../middlewares/middleware.js';

const users_router = Router();

users_router.post('/users/login', check_input({ fields: ['email', 'password'] }), (req, res) => {
    get_user(req.body.user.email, req.body.user.password)
        .then((existing_user) => {
            if (existing_user.errors) {
                return res.status(422).json(existing_user);
            }
            return res.status(200).json(existing_user);
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal server error' });
        });
});

users_router.post('/users', check_input({ fields: ['username', 'email', 'password'] }), (req, res) => {
    create_user(req.body.user.email, req.body.user.username, req.body.user.password)
        .then((new_user) => {
            if (new_user.errors) {
                return res.status(422).json(new_user);
            }
            return res.status(201).json(new_user);
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal server error' });
        });
});

users_router.get('/user', (req, res) => {
    get_user();
});

users_router.put('/user', (req, res) => {
    update_user();
});

export default users_router;