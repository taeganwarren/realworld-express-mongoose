import { Schema, model } from 'mongoose';

const comment_schema = new Schema({
    id: Schema.Types.ObjectId,
    author_username: String, // TODO: Maybe this should be a reference to the User model?
    body: String,
    createdAt: Date,
    editedAt: Date,
    article: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
});

const Comment = model('Comment', comment_schema);
export default Comment;