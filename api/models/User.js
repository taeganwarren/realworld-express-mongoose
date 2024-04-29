import { Schema, model } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: (email) => {
                    validator.isEmail(email);
                },
                message: 'Email must be a valid email address'
            }, {
                validator: async (email) => {
                    if (await User.findOne({ email: email })) {
                        return false;
                    }
                },
                message: 'Email already exists'
            }
        ]
    }, 
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (username) => {
                return username.length >= 4 && username.length <= 20 && validator.isAlphanumeric(username);
            },
            message: 'Username must be between 4 and 20 characters and contain only alphanumeric characters'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return password.length >= 10 && password.length <= 100 && validator.isAscii(password);
            },
            message: 'Password must be between 10 and 100 characters and contain only ASCII characters'
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
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});

userSchema.methods.format_user_response = function() {
    return {
        user: {
            username: this.username,
            token: this.generate_jwt(),
            email: this.email,
            bio: this.bio,
            image: this.image
        }
    };
};

userSchema.methods.generate_jwt = function() {
    return jwt.sign({
        user: {
            id: this._id,
            email: this.email,
            username: this.username,
            password: this.password,
        }}, process.env.JWT_SECRET_KEY);
};

const User = model('User', userSchema);

export default User;