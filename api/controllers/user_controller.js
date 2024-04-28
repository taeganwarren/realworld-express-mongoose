import bcrypt, { hash } from 'bcrypt';
import User from "../models/User.js";

async function create_user(email, username, password) {
    const hash = await bcrypt.hash(password, 10);
    const new_user = new User({
        email: email,
        username: username,
        password: hash
    });
    await new_user.save();
    // TODO: return user without password
    return new_user;
}

async function get_current_user() {
    console.log('user controller');
}

async function update_current_user() {
    console.log('user controller');
}

export { 
    create_user,
    get_current_user,
    update_current_user
}