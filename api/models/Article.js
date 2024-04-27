import { Schema } from 'mongoose';

const articleSchema = new Schema({
    id: Schema.Types.ObjectId,
    slug: String,
    title: String,
    description: String,
    body: String,
    tagList: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    createdAt: Date,
    editedAt: Date,
    favoritesCount: Number,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const Article = mongoose.model('Article', articleSchema);