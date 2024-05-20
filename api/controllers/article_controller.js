// Imports
import Article from '../models/Article.js';
import validator from 'validator';
import User from '../models/User.js';
import Tag from '../models/Tag.js';
import {
    format_validation_errors 
} from '../../utils/helpers.js';

// Get articles globally with optional filters
// TODO: Use pagination
// TODO: Maybe use separate validation functions I made
async function get_articles(id, options) {
    return {};
    // // Validate tag and add to query
    // let query = {
    // };
    // let errors = { 'validation error': [] };
    // if (options.tag) {
    //     if (validator.isLength(options.tag, {
    //         min: 1, max: 100 
    //     }) && validator.isAlpha(options.tag)) {
    //         query.tag_list = {
    //             $elemMatch: {
    //                 name: options.tag 
    //             } 
    //         };
    //     } else {
    //         errors['validation error'].push('Invalid tag');
    //     }
    // }
    // // Validate author and add to query
    // if (options.author) {
    //     if (validator.isLength(options.author, {
    //         min: 1, max: 100 
    //     }) && validator.isAlphanumeric(options.author)) {
    //         const user_id = await User.findOne({
    //             username: options.author 
    //         });
    //         query.author = user_id._id;
    //     } else {
    //         errors['validation error'].push('Invalid author');
    //     }
    // }
    // // Validate favorited and add to query
    // if (options.favorited) {
    //     if (validator.isLength(options.favorited, {
    //         min: 1, max: 100 
    //     }) && validator.isAlphanumeric(options.favorited)) {
    //         const user_favorites = await User.findOne({
    //             username: options.favorited 
    //         });
    //         query._id = {
    //             $in: user_favorites.favorites 
    //         };
    //     } else {
    //         errors['validation error'].push('Invalid favorited');
    //     }
    // }
    // // Validate offset
    // if (options.offset) {
    //     if (!validator.isInt(options.offset)) {
    //         errors['validation error'].push('Invalid offset');
    //     }
    // } else {
    //     options.offset = 0;
    // }
    // // Validate limit
    // if (options.limit) {
    //     if (!validator.isInt(options.limit)) {
    //         errors['validation error'].push('Invalid limit');
    //     }
    // } else {
    //     options.limit = 20;
    // }
    // // Return validation errors
    // if (errors['validation error'].length > 0) {
    //     return errors;
    // }
    // // Find articles
    // const articles = await Article.find(query).sort({
    //     created_at: -1 
    // }).limit(options.limit).skip(options.offset).populate('author');
    // // For each article, check if user is following author or has favorited article
    // let user;
    // if (id) {
    //     user = await User.findById(id);
    // }
    // for (let i = 0; i < articles.length; i++) {
    //     let is_following = false;
    //     let is_favorited = false;
    //     if (id) {
    //         is_following = User.check_following(user.following, articles[i].author._id);
    //         is_favorited = User.check_favorited(user.favorites, articles[i]._id);
    //     }
    //     articles[i] = {
    //         slug: articles[i].slug,
    //         title: articles[i].title,
    //         description: articles[i].description,
    //         body: articles[i].body,
    //         tag_list: articles[i].tag_list.map((tag) => {
    //             return tag.name;
    //         }),
    //         created_at: articles[i].created_at,
    //         updated_at: articles[i].updated_at,
    //         favorited: is_favorited,
    //         favorites_count: articles[i].favorites_count,
    //         author: {
    //             username: articles[i].author.username,
    //             bio: articles[i].author.bio,
    //             image: articles[i].author.image,
    //             following: is_following
    //         }
    //     };
    // }
    // // Return articles
    // return {
    //     articles: articles 
    // };
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
            new_article.tag_list.push(new_tag);
        } else {
            const tag_id = await Tag.findOne({
                name: tag 
            });
            new_article.tag_list.push(tag_id);
        }
    }
    // Save article
    await new_article.save();
    // Add article to user's articles
    const user = await User.findById(id);
    user.articles.push(new_article);
    await user.save();
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
            tag_list: article.tag_list.map((tag) => {
                return tag.name;
            }),
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
    // Update title
    if (title) {
        article.title = title;
    }
    // Update description
    if (description) {
        article.description = description;
    }
    // Update body
    if (body) {
        article.body = body;
    }
    // Update tags
    if (tag_list) {
        article.tag_list = [];
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
                article.tag_list.push(new_tag);
            } else {
                const tag_id = await Tag.findOne({
                    name: tag 
                });
                article.tag_list.push(tag_id);
            }
        }
    }
    // Validate input
    try {
        await article.validate(['title', 'description', 'body', 'tag_list']);
    } catch (error) {
        return {
            'validation error': format_validation_errors(error.errors) 
        };
    }
    // Update updated_at field
    article.updated_at = Date.now();
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
            tag_list: article.tag_list.map((tag) => {
                return tag.name;
            }),
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
    // Remove article from user's articles
    const user = await User.findById(id);
    user.articles.pull(article);
    await user.save();
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