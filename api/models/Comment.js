import { Schema } from 'mongoose';

const commentSchema = new Schema({
    id: Schema.Types.ObjectId,
    author_username: String, // TODO: Maybe this should be a reference to the User model?
    body: String,
    createdAt: Date,
    editedAt: Date,
    article: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
});

const Comment = mongoose.model('Comment', commentSchema);