// Imports
import {
    Schema, Types, model 
} from 'mongoose';

// Comment schema
const comment_schema = new Schema({
    id: Schema.Types.ObjectId,
    body: {
        type: String,
        required: 'Body is required',
        validate: {
            validator: (body) => {
                return validator.isLength(body, {
                    min: 1, max: 250 
                }) && validator.isAscii(body);
            },
            message: 'Body must be between 1 and 250 characters long and contain only ASCII characters'
        }
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Author ID is required'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Comment model
const Comment = model('Comment', comment_schema);

// Export
export default Comment;