// Imports
import {
    Schema, model 
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

// User schema
const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            },
            message: 'Email must be a valid email address'
        }
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        validate: {
            validator: (username) => {
                return validator.isLength(username, {
                    min: 4 
                }) && validator.isAscii(username);
            },
            message: 'Username must be at least 4 characters long and contain only ASCII characters'
        }
    },
    password: {
        type: String,
        required: 'Password is required',
        validate: {
            validator: (password) => {
                return validator.isStrongPassword(password);
            },
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    },
    bio: {
        type: String,
        default: '',
        validate: {
            validator: (bio) => {
                return validator.isLength(bio, {
                    max: 100 
                });
            },
            message: 'Bio must be 100 characters or less'
        }
    },
    image: {
        type: String,
        default: ''
    },
    following: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'User' 
        }],
        default: []
    },
    favorites: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Article' 
        }],
        default: []
    },
    articles: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Article' 
        }],
        default: []
    }
});

// Pre save hook
user_schema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare passwords for logging in
user_schema.methods.compare_password = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Check if user exists
user_schema.statics.exists_username = async function(username) {
    return await this.findOne({
        username: username 
    });
};

// Validate username
user_schema.statics.validate_username = function(username) {
    return validator.isLength(username, {
        min: 4 
    }) && validator.isAscii(username);
};

// Follow and unfollow profiles
user_schema.methods.follow = function(id) {
    if (!this.following.includes(id)) {
        this.following.push(id);
    }
};
user_schema.methods.unfollow = function(id) {
    if (this.following.includes(id)) {
        this.following.pull(id);
    }
};
user_schema.methods.check_following = function(id) {
    return this.following.includes(id);
};

// Favorite and unfavorite articles
user_schema.methods.favorite = function(id) {
    if (!this.favorites.includes(id)) {
        this.favorites.push(id);
    }
};
user_schema.methods.unfavorite = function(id) {
    if (this.favorites.includes(id)) {
        this.favorites.pull(id);
    }
};
user_schema.methods.check_favorited = function(id) {
    return this.favorites.includes(id);
};

// User model
const User = model('User', user_schema);

// Exports
export default User;