import User from '../models/User.js';
import { format_errors } from '../../utils/helpers.js';

async function create_user(email, username, password) {
    const new_user = new User({
        email: email,
        username: username,
        password: password
    });
    try {
        await new_user.validate(['email', 'username', 'password']);
        if (await new_user.check_user_exists()) {
            return { errors: { body: ['Email address already in use'] } };
        }
        await new_user.hash_password();
        await new_user.save();
        return new_user.format_user_response();
    } catch (err) {
        return format_errors(err);
    }
}

async function get_user(email, password) {
    const user_input = new User({
        email: email,
        password: password
    });
    try {
        await user_input.validate(['email', 'password']);
        const existing_user = await User.findOne({ email: email }, 'email username password bio image').exec();
        if (!existing_user || !(await existing_user.check_password(user_input.password))) {
            return { errors: { body: ['Invalid email or password'] } };
        }
        return existing_user.format_user_response();
    } catch (err) {
        return format_errors(err);
    }
}

async function update_user() {
    console.log('user controller');
}

export { 
    create_user,
    get_user,
    update_user
};