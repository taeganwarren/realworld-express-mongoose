// Imports
import validator from 'validator';
import User from '../models/User.js';

// Get profile
async function get_profile(id, username) {
    // Validate username
    if (username.length < 4 && !validator.isAscii(username)) {
        return {
            'validation error': 'Username must be at least 4 characters long and contain only letters and numbers' 
        };
    }
    // Find profile
    const profile = await User.findOne({
        username: username 
    }, 'username bio image');
    if (!profile) {
        return {
            'not found error': 'User not found' 
        };
    }
    // Check if user is following profile
    let is_following = false;
    if (id) {
        const user = await User.findById(id);
        if (user.following.includes(profile._id)) {
            is_following = true;
        }
    }
    // Return profile
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: is_following
        }
    };
}

// Follow profile
async function follow_profile(id, username) {
    // Validate username
    if (username.length < 4 && !validator.isAscii(username)) {
        return {
            'validation error': 'Username must be at least 4 characters long and contain only letters and numbers' 
        };
    }
    // Find profile
    const profile = await User.findOne({
        username: username 
    });
    if (!profile) {
        return {
            'not found error': 'User not found' 
        };
    }
    // Follow profile
    const user = await User.findById(id);
    user.follow(profile._id);
    const following = user.check_following(profile._id);
    // Save user
    await user.save();
    // Return profile
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: following
        }
    };
}

// Unfollow profile
async function unfollow_profile(id, username) {
    // Validate username
    if (username.length < 4 && !validator.isAscii(username)) {
        return {
            'validation error': 'Username must be at least 4 characters long and contain only letters and numbers' 
        };
    }
    // Find profile
    const profile = await User.findOne({
        username: username 
    });
    if (!profile) {
        return {
            'not found error': 'User not found' 
        };
    }
    // Unfollow profile
    const user = await User.findById(id);
    user.unfollow(profile._id);
    const following = user.check_following(profile._id);
    // Save user
    await user.save();
    // Return profile
    return {
        profile: {
            username: profile.username,
            bio: profile.bio,
            image: profile.image,
            following: following
        }
    };
}

// Exports
export {
    get_profile,
    follow_profile,
    unfollow_profile
};