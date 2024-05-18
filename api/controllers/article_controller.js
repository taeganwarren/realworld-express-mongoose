// Imports
import Article from '../models/Article.js';
import validator from 'validator';
import User from '../models/User.js';
import Tag from '../models/Tag.js';
import {
    format_validation_errors 
} from '../../utils/helpers.js';

// Get articles globally
async function get_articles(id) {
    // Find articles
    const articles = await Article.find().sort({
        created_at: -1 
    }).limit(20);
    // Populate author field
    for (let i = 0; i < articles.length; i++) {
        await articles[i].populate('author');
    }
    // TODO: populate tags
    // For each article, check if user is following author or has favorited article
    for (let i = 0; i < articles.length; i++) {
        let is_following = false;
        let is_favorited = false;
        if (id) {
            const user = await User.findById(id);
            is_following = User.check_following(user.following, articles[i].author._id);
            is_favorited = User.check_favorited(user.favorites, articles[i]._id);
        }
        articles[i] = {
            slug: articles[i].slug,
            title: articles[i].title,
            description: articles[i].description,
            body: articles[i].body,
            tag_list: articles[i].tag_list,
            created_at: articles[i].created_at,
            updated_at: articles[i].updated_at,
            favorited: is_favorited,
            favorites_count: articles[i].favorites_count,
            author: {
                username: articles[i].author.username,
                bio: articles[i].author.bio,
                image: articles[i].author.image,
                following: is_following
            }
        };
    }
    // Return articles
    return {
        articles: articles 
    };
}

// Create article
async function create_article(id, title, description, body, tag_list) {
    // Validate input
    const new_article = new Article({
        title: title,
        description: description,
        body: body,
        tag_list: [],
        author: id
    });
    try {
        await new_article.validate(['title', 'description', 'body']);
    } catch (error) {
        return {
            'validation error': format_validation_errors(error.errors) 
        };
    }
    // Add tags
    for (let tag of tag_list) {
        if (!(await Tag.exists(tag))) {
            const new_tag = new Tag({
                name: tag 
            });
            try {
                await new_tag.validate(['name']);
            } catch (error) {
                return {
                    'validation error': format_validation_errors(error.errors) 
                };
            }
            await new_tag.save();
            new_article.tag_list.push(new_tag._id);
        } else {
            const tag_id = await Tag.findOne({ name: tag });
            new_article.tag_list.push(tag_id._id);
        }
    }
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
            tag_list: tag_list,
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
    };
}

// Get article
async function get_article(id, slug) {
    // Validate input
    if (validator.isLength(slug, {
        min: 1, max: 100 
    }) && !validator.isAscii(slug)) {
        return {
            'validation error': 'Invalid slug' 
        };
    }
    // Find article
    const article = await Article.findOne({
        slug: slug 
    });
    if (!article) {
        return {
            'not found error': 'Article not found' 
        };
    }
    // Populate tags
    await article.populate('tag_list');
    // Populate author field
    await article.populate('author');
    // Check if user is following author
    let is_following = false;
    if (id) {
        const user = await User.findById(id);
        is_following = User.check_following(user.following, article.author._id);
    }
    // Return article
    return {
        article: {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            tag_list: article.tag_list.map((tag) => tag.name),
            created_at: article.created_at,
            updated_at: article.updated_at,
            favorited: false,
            favorites_count: 0,
            author: {
                username: article.author.username,
                bio: article.author.bio,
                image: article.author.image,
                following: is_following
            }
        }
    };
}

// Update article
async function update_article(id, slug, title, description, body, tag_list) {
    // Find article
    const article = await Article.findOne({
        slug: slug 
    });
    if (!article) {
        return {
            'not found error': 'Article not found' 
        };
    }
    // Check if user is author
    if (article.author.toString() !== id) {
        return {
            'auth error': 'User not authorized to update article' 
        };
    }
    // Update article fields
    if (title) {
        article.title = title;
    }
    if (description) {
        article.description = description;
    }
    if (body) {
        article.body = body;
    }
    // TODO: Tags need to be saved separately in a tags collection
        // Check if the tags exist before creating new ones
    if (tag_list) {
        article.tag_list = tag_list;
    }
    // Validate input
    try {
        await article.validate(['title', 'description', 'body', 'tag_list']);
    } catch (error) {
        return {
            'validation error': format_validation_errors(error.errors) 
        };
    }
    // Save article
    await article.save();
    // Populate author field
    await article.populate('author');
    // Return article
    return {
        article: {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            tag_list: article.tag_list,
            created_at: article.created_at,
            updated_at: article.updated_at,
            favorited: false,
            favorites_count: article.favorites_count,
            author: {
                username: article.author.username,
                bio: article.author.bio,
                image: article.author.image,
                following: false
            }
        }
    };
}

// Delete article
async function delete_article(id, slug) {
    // Validate input
    if (validator.isLength(slug, {
        min: 1, max: 100 
    }) && !validator.isAscii(slug)) {
        return {
            'validation error': 'Invalid slug' 
        };
    }
    // Find article
    const article = await Article.findOne({
        slug: slug 
    });
    if (!article) {
        return {
            'not found error': 'Article not found' 
        };
    }
    // Check if user is author
    if (article.author.toString() !== id) {
        return {
            'auth error': 'User not authorized to delete article' 
        };
    }
    // Delete article
    await Article.deleteOne({
        slug: slug 
    });
    // Return success
    return {
    };
}

export {
    get_articles,
    create_article,
    get_article,
    update_article,
    delete_article
};