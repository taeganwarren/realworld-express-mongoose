// Imports
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { format_validation_errors } from '../../utils/helpers.js';

// Create user
async function create_user(email, username, password) {
    // Validate input
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
    // Check if email or username already in use
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
    // Save user
    await new_user.save();
    // Return user
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

// Login user
async function login_user(email, password) {
    // Validate input
    const user_input = new User({
        email: email,
        password: password
    });
    try {
        await user_input.validate(['email', 'password']);
    } catch (error) {
        return { 'validation error': format_validation_errors(error.errors) };
    }
    // Check if user exists and password is correct
    const user = await User.findOne({ email: user_input.email }, 'email username password bio image');
    if (!user || !await user.compare_password(user_input.password)){
        return { 'auth error': 'Invalid email or password' };
    }
    // Return user
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

// Get user
async function get_user(id) {
    // Find user
    const user = await User.findById(id, 'email username bio image');
    // Return user
    return {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image
        }
    };
}

// Update user
async function update_user(id, email, username, password, bio, image) {
    // Find user
    const user = await User.findById(id, 'email username password bio image');
    // Update user fields
    if (email) {
        user.email = email;
    }
    if (username) {
        user.username = username;
    }
    if (password) {
        user.password = password;
    }
    if (bio) {
        user.bio = bio;
    }
    if (image) {
        user.image = image;
    }
    // TODO: could maybe check and validate each field separately above and add the email and username checks to
    // Validate input
    try {
        await user.validate(['email', 'username', 'password']);
    } catch (error) {
        return { 'validation error': format_validation_errors(error.errors) };
    }
    // Check if email or username already in use
    const errors = { 'validation error': [] };
    if (email && await User.exists({ email: email })) {
        errors['validation error'].push('Email address already in use');
    }
    if (username && await User.exists({ username: username })) {
        errors['validation error'].push('Username already in use');
    }
    if (errors['validation error'].length > 0) {
        return errors;
    }
    // Save user
    await user.save();
    // Return user
    return {
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image
        }
    };
}

// Exports
export { 
    create_user,
    login_user,
    get_user,
    update_user
};