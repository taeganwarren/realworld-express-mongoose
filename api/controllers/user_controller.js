import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function create_user(email, username, password) {
    const new_user = new User({
        email: email,
        username: username,
        password: await bcrypt.hash(password, 10)
    });
    await new_user.save();
    return {
        email: new_user.email,
        username: new_user.username
    };
}

async function login_user(email, password) {
    const user = await User.findOne({ email: email }, 'email username password');
    if (!user) {
        return { error: "Login failed" };
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        return {
            email: user.email,
            username: user.username,
            token: token
        }
    } else {
        return { error: "Login failed" };
    }
}

async function get_user(id) {
    const user = await User.findById(id, 'email username');
    return {
        email: user.email,
        username: user.username
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
        user.password = await bcrypt.hash(password, 10);
    }
    if (bio) {
        user.bio = bio;
    }
    if (image) {
        user.image = image;
    }
    await user.save();
    return {
        email: user.email,
        username: user.username
    };
}

export { 
    create_user,
    login_user,
    get_user,
    update_user
};