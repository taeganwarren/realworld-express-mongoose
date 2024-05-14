import Article from '../models/Article.js';
import validator from 'validator';
import { format_validation_errors } from '../../utils/helpers.js';
import slugify from 'slugify';
import User from '../models/User.js';

async function create_article(id, title, description, body, tags) {
    const validation_errors = {};
    for (const tag of tags) {
        if (!validator.isLength(tag, { min: 1, max: 20 }) || !validator.isAlpha(tag)) {
            validation_errors['tag'] = 'Invalid tag';
        }
    }
    if (Object.keys(validation_errors).length > 0) {
        return { 'validation error': validation_errors };
    }
    const new_article = new Article({
        title: title,
        description: description,
        body: body
    });
    // TODO: check if slug is unique
    // TODO: submitting with valid token but non existent user crashes app
    new_article.tag_list = tags;
    new_article.author = id;
    new_article.slug = slugify(new_article.title, { lower: true });
    await new_article.save();
    await new_article.populate('author');
    return {
        article: {
            slug: new_article.slug,
            title: new_article.title,
            description: new_article.description,
            body: new_article.body,
            tag_list: new_article.tag_list,
            created_at: new_article.created_at,
            updated_at: new_article.updated_at,
            favorited: false,
            favorites_count: 0,
            author: {
                username: new_article.author.username,
                bio: new_article.author.bio,
                image: new_article.author.image,
                following: false
            }
        }
    }
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