import User from '../models/User.js';
import { format_validation_errors } from '../../utils/helpers.js';

async function create_user(email, username, password) {
    const new_user = new User({
        email: email,
        username: username,
        password: password
    });
    try {
        await new_user.validate(['email', 'username', 'password']);
        const errors = { errors: { body: [] } };
        if (await new_user.check_email_exists()) {
            errors.errors.body.push('Email address already in use');
        }
        if (await new_user.check_username_exists()) {
            errors.errors.body.push('Username already in use');
        }
        if (errors.errors.body.length > 0) return errors;
        await new_user.hash_password();
        await new_user.save();
        new_user.token = new_user.generate_jwt();
        return new_user.format_user_response();
    } catch (err) {
        return format_validation_errors(err);
    }
}

async function login_user(email, password) {
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
        existing_user.token = existing_user.generate_jwt();
        return existing_user.format_user_response();
    } catch (err) {
        return format_validation_errors(err);
    }
}

async function get_user(user) {
    try {
        const existing_user = await User.findOne({ email: user.email }, 'email username bio image').exec();
        if (!existing_user) {
            return { errors: { body: ['User not found'] } };
        }
        existing_user.token = user.token;
        return existing_user.format_user_response();
    }
    catch (err) {
        return { errors: { body: ['Internal server error'] } };
    }
}

async function update_user() {
    console.log('user controller');
}

export { 
    create_user,
    login_user,
    get_user,
    update_user
};