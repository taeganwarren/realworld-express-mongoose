import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        validate: {
            validator: (email) => validator.isEmail(email),
            message: 'Email must be a valid email address'
        }
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        validate: {
            validator: (username) => username.length >= 4 && validator.isAlphanumeric(username),
            message: 'Username must be at least 4 characters long and contain only letters and numbers'
        }
    },
    password: {
        type: String,
        required: 'Password is required',
        validate: {
            validator: (password) => validator.isStrongPassword(password),
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    },
    bio: {
        type: String,
        default: '',
        validate: {
            validator: (bio) => bio.length <= 100,
            message: 'Bio must be 100 characters or less'
        }
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

// TODO: add database actions as functions i can call here like follow, unfollow, favorite, unfavorite, etc
// TODO: will need validation to make sure a followed user is a real user, a favorited article is a real article, etc
// TODO: jwt functions

user_schema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

user_schema.methods.compare_password = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', user_schema);
export default User;