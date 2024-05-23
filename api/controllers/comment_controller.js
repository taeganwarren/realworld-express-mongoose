// Imports
import Article from '../models/Article.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import validator from 'validator';
import {
    format_validation_errors 
} from '../../utils/helpers.js';

// Get comments
async function get_comments(id, slug) {
    // Validate input
    if (validator.isLength(slug, {
        min: 1, max: 100 
    }) && !validator.isAscii(slug)) {
        return {
            'validation error': 'Invalid slug' 
        };
    }
    // Find article
    const article = await Article.findOne({ slug: slug });
    if (!article) {
        return {
            'not found error': 'Article not found' 
        };
    }
    // Find user
    const user = await User.findById(id);
    if (!user) {
        return {
            'not found error': 'User not found' 
        };
    }
    // Populate comments
    await article.populate('comments.author');
    // Return comments
    return {
        comments: article.comments.map((comment) => {
            let is_following = false;
            if (user.following.includes(comment.author._id)) {
                is_following = true;
            }
            return {
                id: comment._id,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
                body: comment.body,
                author: {
                    username: comment.author.username,
                    bio: comment.author.bio,
                    image: comment.author.image,
                    following: is_following
                }
            };
        })
    }
}

// Create comment
async function create_comment(id, slug, comment_body) {
    // Validate input
    const comment = new Comment({
        body: comment_body.body,
        author: id
    });
    try {
        await comment.validate();
    } catch (error) {
        console.log(error);
        return format_validation_errors(error);
    }
    // Find article
    const article = await Article.findOne({ slug: slug });
    if (!article) {
        return {
            'not found error': 'Article not found' 
        };
    }
    // Add comment
    await comment.save();
    article.comments.push(comment._id);
    await article.save();
    await comment.populate('author');
    // Return comment
    return {
        comment: {
            id: comment._id,
            createdAt: comment.created_at,
            updatedAt: comment.updated_at,
            body: comment.body,
            author: {
                username: comment.author.username,
                bio: comment.author.bio,
                image: comment.author.image,
                following: false
            }
        }
    }
}

// Delete comment
async function delete_comment(id, slug, comment_id) {
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
    // Find comment
    const comment = await Comment.findById({ _id: comment_id });
    if (!comment) {
        return {
            'not found error': 'Comment not found' 
        };
    }
    // Check if user is author
    if (comment.author.toString() !== id) {
        return {
            'auth error': 'User is not the author of the comment'
        };
    }
    // Delete comment
    await Comment.deleteOne({ _id: comment_id });
    article.comments.pull(comment_id);
    await article.save();
    // Return success
    return {
    };
}

// Export
export {
    get_comments,
    create_comment,
    delete_comment
};