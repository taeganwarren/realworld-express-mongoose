import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
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
    } catch (error) {
        return { 'validation error': format_validation_errors(error.errors) };
    }
    const errors = { 'validation error': [] };
    if (await User.exists({ email: new_user.email })) {
        errors['validation error'].push('Email address already in use');
    }
    if (await User.exists({ username: new_user.username })) {
        errors['validation error'].push('Username already in use');
    }
    if (errors['validation error'].length > 0) {
        return errors;
    }
    new_user.password = await bcrypt.hash(new_user.password, 10);
    await new_user.save();
    return {
        user: {
            email: new_user.email,
            token: jwt.sign({ id: new_user._id.toString() }, process.env.JWT_SECRET),
            username: new_user.username,
            bio: new_user.bio,
            image: new_user.image
        }
    };
}

async function login_user(email, password) {
    const user_input = new User({
        email: email,
        password: password
    });
    try {
        await user_input.validate(['email', 'password']);
    } catch (error) {
        return { 'validation error': format_validation_errors(error.errors) };
    }
    const user = await User.findOne({ email: email }, 'email username password bio image');
    if (!user || !await bcrypt.compare(user_input.password, user.password)){
        return { 'auth error': 'Invalid email or password' };
    } else {
        return {
            user: {
                email: user.email,
                token: jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET),
                username: user.username,
                bio: user.bio,
                image: user.image
            }
        }
    }
}

async function get_user(id) {
    const user = await User.findById(id, 'email username bio image');
    return {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image
        }
    };
}

async function update_user(id, email, username, password, bio, image) {
    const user = await User.findById(id, 'email username password bio image');
    const errors = { 'validation error': [] };
    if (email) {
        if (validator.isEmail(email)) {
            if (await User.exists({ email: email })) {
                errors['validation error'].push('Email address already in use');
            } else {
                user.email = email;
            }
        } else {
            errors['validation error'].push('Invalid email');
        }
    }
    if (username) {
        if (validator.isAlphanumeric(username)) {
            if (await User.exists({ username: username })) {
                errors['validation error'].push('Username already in use');
            } else {
                user.username = username;
            }
        } else {
            errors['validation error'].push('Invalid username');
        }
    }
    if (password) {
        if (validator.isStrongPassword(password)) {
            user.password = await bcrypt.hash(password, 10);
        } else {
            errors['validation error'].push('Invalid password');
        }
    }
    if (bio) {
        user.bio = bio;
    }
    if (image) {
        user.image = image;
    }
    if (errors['validation error'].length > 0) {
        return errors;
    }
    await user.save();
    return {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image
        }
    };
}

export { 
    create_user,
    login_user,
    get_user,
    update_user
};