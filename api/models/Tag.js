import { Schema } from 'mongoose';

const tagSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
});

const Tag = mongoose.model('Tag', tagSchema);