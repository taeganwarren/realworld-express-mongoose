import { Schema, model } from 'mongoose';

const comment_schema = new Schema({
    id: Schema.Types.ObjectId,
    author_username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    createdAt: Date,
    editedAt: Date,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        index: true
    },
});

const Comment = model('Comment', comment_schema);
export default Comment;