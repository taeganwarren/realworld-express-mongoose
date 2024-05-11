import { Router } from 'express';
import {
    get_feed,
    get_global_feed,
    create_article,
    get_article,
    update_article,
    delete_article
} from '../controllers/article_controller.js';
import verify_token_optional from '../middlewares/verify_token_optional.js';
import verify_token from '../middlewares/verify_token.js';

const articles_router = Router();

articles_router.post('/articles', verify_token, (req, res) => {
    const { id } = req.user;
    const { title, description, body, tagList } = req.body.article;
    create_article(id, title, description, body, tagList).then((response) => {
        res.status(201).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

articles_router.get('/articles/:slug', verify_token_optional, (req, res) => {
    const { slug } = req.params;
    const { id } = req.user;
    get_article(id, slug).then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

export default articles_router;