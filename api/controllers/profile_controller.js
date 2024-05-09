import User from '../models/User.js';

async function get_profile() {
    return { "message": "get_profile" };
}

async function follow_profile() {
    return { "message": "follow_profile" };
}

async function unfollow_profile() {
    return { "message": "unfollow_profile" };
}

export {
    get_profile,
    follow_profile,
    unfollow_profile
}