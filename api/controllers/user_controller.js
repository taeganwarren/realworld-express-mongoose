import bcrypt from 'bcrypt';
import User from "../models/User.js";

async function create_user(email, username, password) {
    const hash = await bcrypt.hash(password, 10);
    const new_user = new User({
        email: email,
        username: username,
        password: hash
    });
    await new_user.save();
    return new_user.format_user_response();
}

async function get_user(email, password) {
    const existing_user = await User.findOne({ email: email }, 'email username password bio image').exec();
    const error_response = { "errors": { "body": ["Invalid email or password"] } };
    if (!existing_user || !(await bcrypt.compare(password, existing_user.password))) {
        return error_response;
    }
    return existing_user.format_user_response();
}

async function update_user() {
    console.log('user controller');
}

export { 
    create_user,
    get_user,
    update_user
}