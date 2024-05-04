import { Schema, model, set } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            },
            message: 'Email must be a valid email address'
        },
        set: (email) => email.toLowerCase()
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
        },
        set: (username) => username.toLowerCase()
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
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
});

user_schema.methods.hash_password = async function() {
    this.password = await bcrypt.hash(this.password, 10);
};

user_schema.methods.check_password = async function(password) {
    return await bcrypt.compare(password, this.password);
}

user_schema.methods.format_user_response = function() {
    return {
        user: {
            username: this.username,
            token: this.token,
            email: this.email,
            bio: this.bio,
            image: this.image
        }
    };
};

user_schema.methods.generate_jwt = function() {
    return jwt.sign({
        user: {
            id: this._id,
            email: this.email,
            username: this.username
        }
    }, process.env.JWT_SECRET_KEY);
};

user_schema.methods.check_email_exists = async function() {
    return await User.exists({ email: this.email });
}

user_schema.methods.check_username_exists = async function() {
    return await User.exists({ username: this.username });
}

const User = model('User', user_schema);
export default User;