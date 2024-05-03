import { Schema, model } from 'mongoose';

const favorite_schema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

const Favorite = model('Favorite', favorite_schema);
export default Favorite;