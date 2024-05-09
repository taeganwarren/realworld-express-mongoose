import { Schema, model } from 'mongoose';

const user_schema = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    username: String,
    password: String,
    bio: String,
    image: String,
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = model('User', user_schema);
export default User;