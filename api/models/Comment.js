import { Schema } from 'mongoose';

const commentSchema = new Schema({
    id: Schema.Types.ObjectId,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    body: String,
    createdAt: Date,
    editedAt: Date,
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
});

const Comment = mongoose.model('Comment', commentSchema);