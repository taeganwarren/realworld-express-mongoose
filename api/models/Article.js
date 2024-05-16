// Imports
import {
    Schema, Types, model 
} from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

// Article schema
const article_schema = new Schema({
    id: Schema.Types.ObjectId,
    slug: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: 'Title is required',
        validate: {
            validator: (title) => {
                return validator.isLength(title, {
                    min: 1, max: 100 
                }) && validator.isAscii(title);
            },
            message: 'Title must be between 1 and 100 characters long and contain only ASCII characters'
        }
    },
    description: {
        type: String,
        required: 'Description is required',
        validate: {
            validator: (description) => {
                return validator.isLength(description, {
                    min: 1, max: 200 
                }) && validator.isAscii(description);
            },
            message: 'Description must be between 1 and 200 characters long and contain only ASCII characters'
        }
    },
    body: {
        type: String,
        required: 'Body is required',
        validate: {
            validator: (body) => {
                return validator.isLength(body, {
                    min: 1, max: 10000 
                }) && validator.isAscii(body);
            },
            message: 'Body must be between 1 and 10000 characters long and contain only ASCII characters'
        }
    },
    tag_list: {
        type: [String],
        default: [],
        validate: {
            validator: (tag_list) => {
                return tag_list.every((tag) => {
                    return validator.isLength(tag, {
                        min: 1, max: 20 
                    }) && validator.isAlpha(tag);
                });
            },
            message: 'Tags must be between 1 and 20 characters long and contain only letters'
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    favorites_count: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Pre save hook
article_schema.pre('save', function(next) {
    if (this.isNew) {
        this._id = new Types.ObjectId();
        this.slug = slugify(this.title, {
            lower: true 
        }) + '-' + this._id.toString();
    }
    next();
});

// Article model
const Article = model('Article', article_schema);

// Exports
export default Article;