// Imports
import {
    Schema, Types, model 
} from 'mongoose';
import validator from 'validator';

// Comment schema
const comment_schema = new Schema({
    id: Schema.Types.ObjectId,
    body: {
        type: String,
        validate: {
            validator: (body) => {
                return validator.isLength(body, {
                    min: 1, max: 250 
                }) && validator.isAscii(body);
            },
            message: 'Body must be between 1 and 250 characters long and contain only ASCII characters'
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Comment model
const Comment = model('Comment', comment_schema);

// Export
export default Comment;