import { Schema, model, set } from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

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
            message: 'Invalid title'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: (description) => validator.isLength(description, { min: 1, max: 200 }) && validator.isAscii(description),
            message: 'Invalid description'
        }
    },
    body: {
        type: String,
        required: true,
        validate: {
            validator: (body) => validator.isLength(body, { min: 1, max: 10000 }) && validator.isAscii(body),
            message: 'Invalid body'
        }
    },
    tag_list: {
        type: [String],
        default: [],
        validate: {
            validator: (tag_list) => tag_list.every((tag) => validator.isLength(tag, { min: 1, max: 20 }) && validator.isAlpha(tag)),
            message: 'Invalid tag'
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

const Article = model('Article', article_schema);
export default Article;