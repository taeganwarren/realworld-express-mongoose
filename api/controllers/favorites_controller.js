// Imports
import Article from '../models/Article.js';
import User from '../models/User.js';

// Favorite article
async function favorite_article(id, slug) {
    // Find user
    const user = await User.findById(id);
    // Find article
    const article = await Article.findOne({
        slug: slug 
    });
    // Check if article exists
    if (!article) {
        return {
            'validation error': 'Article does not exist' 
        };
    }
    // Favorite article
    user.favorite(article._id);
    // Save user
    await user.save();
    // Return article
    return {
        article: {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            tag_list: article.tag_list,
            favorited: true,
            favorites_count: article.favorites_count,
            author: {
                username: article.author.username,
                bio: article.author.bio,
                image: article.author.image,
                following: user.is_following(article.author._id) 
            }
        }
    };
}

// Unfavorite article
async function unfavorite_article(id, slug) {
    // Find user
    const user = await User.findById(id);
    // Find article
    const article = await Article.findOne({
        slug: slug 
    });
    // Check if article exists
    if (!article) {
        return {
            'validation error': 'Article does not exist' 
        };
    }
    // Unfavorite article
    user.unfavorite(article._id);
    // Save user
    await user.save();
    // Return article
    return {
        article: {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            tag_list: article.tag_list,
            favorited: false,
            favorites_count: article.favorites_count,
            author: {
                username: article.author.username,
                bio: article.author.bio,
                image: article.author.image,
                following: user.is_following(article.author._id) 
            }
        }
    };
}

// Exports
export {
    favorite_article,
    unfavorite_article
};