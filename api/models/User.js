import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: String, 
    username: String,
    password: String,
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
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
        'user': {
            'id': this._id,
            'email': this.email,
            'username': this.username,
            'password': this.password,
        }}, process.env.JWT_SECRET_KEY);
};

const User = mongoose.model('User', userSchema);

export default User;