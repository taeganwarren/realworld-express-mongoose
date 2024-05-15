// Imports
import { Schema, model } from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

// Article schema
const article_schema = new Schema({
    id: Schema.Types.ObjectId,
    slug: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (slug) => validator.isLength(slug, { min: 1, max: 100 }) && validator.isAscii(slug),
            message: 'Invalid slug'
        }
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: (title) => validator.isLength(title, { min: 1, max: 100 }) && validator.isAscii(title),
            message: 'Title must be between 1 and 100 characters long and contain only ASCII characters'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: (description) => validator.isLength(description, { min: 1, max: 200 }) && validator.isAscii(description),
            message: 'Description must be between 1 and 200 characters long and contain only ASCII characters'
        }
    },
    body: {
        type: String,
        required: true,
        validate: {
            validator: (body) => validator.isLength(body, { min: 1, max: 10000 }) && validator.isAscii(body),
            message: 'Body must be between 1 and 10000 characters long and contain only ASCII characters'
        }
    },
    tag_list: {
        type: [String],
        default: [],
        validate: {
            validator: (tag_list) => tag_list.every((tag) => validator.isLength(tag, { min: 1, max: 20 }) && validator.isAlpha(tag)),
            message: 'Tags must be between 1 and 20 characters long and contain only letters'
        }
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    favorites_count: {
        type: Number,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

// Slugify title
// TODO: Needs to make sure that the slug is unique and is less than 100 characters and set better error messages
article_schema.methods.slugify = function() {
    this.slug = slugify(this.title, { lower: true });
};

// Article model
const Article = model('Article', article_schema);

// Exports
export default Article;