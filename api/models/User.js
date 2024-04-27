import { Schema } from 'mongoose';

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: String, 
    username: String,
    bio: String,
    image: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});

const User = mongoose.model('User', userSchema);