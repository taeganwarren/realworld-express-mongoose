import { Schema } from 'mongoose';

const articleSchema = new Schema({
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

const Article = mongoose.model('Article', articleSchema);