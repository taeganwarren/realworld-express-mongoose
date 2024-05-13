import Article from '../models/Article.js';
import validator from 'validator';
import { format_validation_errors } from '../../utils/helpers.js';
import slugify from 'slugify';

async function create_article(id, title, description, body, tags) {
    const new_article = new Article({
        title: title,
        description: description,
        body: body
    });
    new_article.slug = slugify(new_article.title, { lower: true });
}

async function get_article() {

}

async function update_article() {

}

async function delete_article() {

}

export {
    create_article,
    get_article,
    update_article,
    delete_article
};