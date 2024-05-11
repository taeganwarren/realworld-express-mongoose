import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function create_user(email, username, password) {
    const new_user = new User({
        email: email,
        username: username,
        password: password
    });
    try {
        await new_user.validate(['email', 'username', 'password']);
    } catch (error) {
        return { error: error.errors };
    }
    const errors = { error: [] };
    if (await User.exists({ email: new_user.email })) {
        errors.error.push('Email address already in use');
    }
    if (await User.exists({ username: new_user.username })) {
        errors.error.push('Username already in use');
    }
    if (errors.error.length > 0) {
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
        return { 'validation error': error.errors };
    }
    const user = await User.findOne({ email: email }, 'email username password bio image');
    if (!user || !await bcrypt.compare(user_input.password, user.password)){
        return { 'unauthorized error': 'Invalid email or password' };
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
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image
    };
}

async function update_user(id, email, username, password, bio, image) {
    const user = await User.findById(id);
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
    try {
        await user.validate(['email', 'username', 'password']);
    } catch (error) {
        return { error: error.errors };
    }
    const errors = { error: [] };
    if (email && await User.exists({ email: user.email })) {
        errors.error.push('Email address already in use');
    }
    if (username && await User.exists({ username: user.username })) {
        errors.error.push('Username already in use');
    }
    if (errors.error.length > 0) {
        return errors;
    }
    user.password = await bcrypt.hash(user.password, 10);
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