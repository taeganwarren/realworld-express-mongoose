// Imports
import Article from '../models/Article.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import {
    format_validation_errors 
} from '../../utils/helpers.js';

// Get comments
async function get_comments(id, slug) {

}

// Create comment
async function create_comment(id, slug, comment_data) {
    // Validate input
    const comment = new Comment({
        body: comment_data.body,
        author: id
    });
    try {
        await comment.validate(['body']);
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
            created_at: comment.created_at,
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

}

// Export
export {
    get_comments,
    create_comment,
    delete_comment
};