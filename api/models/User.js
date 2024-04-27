import { Schema } from 'mongoose';

const userSchema = new Schema({
    email: String, 
    username: String,
    bio: String,
    image: String
});