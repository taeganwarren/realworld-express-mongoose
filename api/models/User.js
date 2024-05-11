import { Schema, model } from 'mongoose';
import validator from 'validator';

const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: 'Invalid email'
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (username) => validator.isAlphanumeric(username),
            message: 'Invalid username'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => validator.isStrongPassword(password),
            message: 'Invalid password'
        }
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