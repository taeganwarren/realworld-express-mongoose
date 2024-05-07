import User from '../models/User.js';
import { format_validation_errors } from '../../utils/helpers.js';

async function create_user(email, username, password) {
    const new_user = new User({
        email: email,
        username: username,
        password: password
    });
    try { await new_user.validate(['email', 'username', 'password']); }
    catch (err) { return format_validation_errors(err); }
    const errors = { errors: { body: [] } };
    if (await User.exists({ email: new_user.email })) {
        errors.errors.body.push('Email address already in use');
    }
    if (await User.exists({ username: new_user.username })) {
        errors.errors.body.push('Username already in use');
    }
    if (errors.errors.body.length > 0) return errors;
    await new_user.hash_password();
    await new_user.save();
    new_user.token = new_user.generate_jwt();
    return new_user.format_user_response();
}

async function login_user(email, password) {
    const user_input = new User({
        email: email,
        password: password
    });
    try { await user_input.validate(['email', 'password']); }
    catch (err) { return format_validation_errors(err); }
    const existing_user = await User.findOne({ email: email }, 'email username password bio image').exec();
    if (!existing_user || !(await existing_user.check_password(user_input.password))) {
        return { errors: { body: ['Invalid email or password'] } };
    }
    existing_user.token = existing_user.generate_jwt();
    return existing_user.format_user_response();
}

async function get_user(current_user) {
    const existing_user = await User.findOne({ email: current_user.email }, 'email username bio image').exec();
    existing_user.token = current_user.token;
    return existing_user.format_user_response();
}

async function update_user(current_user, updated_user_input) {
    const token = current_user.token;
    current_user = await User.findOne({ email: current_user.email }, 'email username password bio image').exec();
    for (const key in updated_user_input) {
        current_user[key] = updated_user_input[key];
    }
    try { await current_user.validate(Object.keys(updated_user_input)); }
    catch (err) { return format_validation_errors(err); }
    const errors = { errors: { body: [] } };
    if (updated_user_input.email && await User.exists({ email: updated_user_input.email })) {
        errors.errors.body.push('Email address already in use');
    }
    if (updated_user_input.username && await User.exists({ username: updated_user_input.username })) {
        errors.errors.body.push('Username already in use');
    }
    if (errors.errors.body.length > 0) return errors;
    if (updated_user_input.password) {
        await current_user.hash_password();
    }
    await current_user.save();
    current_user.token = token;
    return current_user.format_user_response();
}

export { 
    create_user,
    login_user,
    get_user,
    update_user
};