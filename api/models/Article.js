import { Schema, model } from 'mongoose';

const article_schema = new Schema({
    id: Schema.Types.ObjectId,
    slug: String,
    title: String,
    description: String,
    body: String,
    tagList: {
        type: [String],
        index: {
            type: 'text'
        }
    },
    createdAt: Date,
    editedAt: Date,
    favoritesCount: Number,
    author_username: String, // TODO: Maybe this should be a reference to the User model?
});

const Article = model('Article', article_schema);
export default Article;