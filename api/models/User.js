import { Schema, model } from 'mongoose';
import validator from 'validator';

const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true,
        validator: (value) => {
            return validator.isEmail(value);
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        validator: (value) => {
            return validator.isAlphanumeric(value);
        }
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    favorites: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
        default: []
    },
    articles: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
        default: []
    },
});

const User = model('User', user_schema);
export default User;