import validator from 'validator';
import User from '../models/User.js';

async function get_profile(id, username) {
    if (!validator.isAlphanumeric(username)) {
        return { 'validation error': 'Invalid username' };
    }
    const profile = await User.findOne({ username: username }, 'username bio image');
    if (!profile) {
        return { 'not found error': 'User not found' };
    }
    let is_following = false;
    if (id) {
        const user = await User.findById(id);
        if (user.following.includes(profile._id)) {
            is_following = true;
        }
    } else {
        is_following = false;
    }
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: is_following
        }
    };
}

async function follow_profile(id, username) {
    if (!validator.isAlphanumeric(username)) {
        return { 'validation error': 'Invalid username' };
    }
    const profile = await User.findOne({ username: username });
    if (!profile) {
        return { 'not found error': 'User not found' };
    }
    const user = await User.findById(id);
    if (user.following.includes(profile._id)) {
        return { 'validation error': 'Already following user' };
    }
    user.following.push(profile._id);
    await user.save();
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: true
        }
    };
}

async function unfollow_profile(id, username) {
    if (!validator.isAlphanumeric(username)) {
        return { 'validation error': 'Invalid username' };
    }
    const profile = await User.findOne({ username: username });
    if (!profile) {
        return { 'not found error': 'User not found' };
    }
    const user = await User.findById(id);
    if (!user.following.includes(profile._id)) {
        return { 'validation error': 'Not following user' };
    }
    user.following.pull(profile._id);
    await user.save();
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: false
        }
    };
}

export {
    get_profile,
    follow_profile,
    unfollow_profile
};