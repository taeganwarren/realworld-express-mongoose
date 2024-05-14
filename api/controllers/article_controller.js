// Imports
import Article from '../models/Article.js';
import { format_validation_errors } from '../../utils/helpers.js';

// Create article
async function create_article(id, title, description, body, tags) {
    // Validate input
    const new_article = new Article({
        title: title,
        description: description,
        body: body,
        tag_list: tags
    });
    try {
        await new_article.validate(['title', 'description', 'body', 'tag_list']);
    } catch (error) {
        return { 'validation error': format_validation_errors(error.errors) };
    }
    // Set author and slug
    new_article.author = id;
    new_article.slugify();
    // Save article
    await new_article.save();
    // Populate author field
    await new_article.populate('author');
    // Return article
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