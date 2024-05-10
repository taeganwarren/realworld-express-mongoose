import User from '../models/User.js';

async function get_profile(id, username) {
    const profile = await User.findOne({ username: username }, 'username');
    if (!profile) {
        return { error: "Profile not found" };
    }
    let following = false;
    if (id) {
        const user = await User.findById(id, 'following');
        if (user.following.includes(profile._id)) {
            following = true;
        }
    }
    return { 
        username: profile.username,
        following: following
    };
}

async function follow_profile(id, username) {
    const user_to_follow = await User.findOne({ username: username }, '_id username, bio, image');
    const user = await User.findById(id);
    user.following.push(user_to_follow._id);
    await user.save();
    return {
        username: user_to_follow.username,
        bio: user_to_follow.bio,
        image: user_to_follow.image,
        following: true
    }
}

async function unfollow_profile(id, username) {
    const user_to_unfollow = await User.findOne({ username: username }, '_id');
    const user = await User.findById(id);
    user.following.pull(user_to_unfollow._id);
    await user.save();
    return {
        username: username,
        following: false
    }
}

export {
    get_profile,
    follow_profile,
    unfollow_profile
}