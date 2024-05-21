// Imports
import Tag from '../models/Tag.js';

// Get tags
async function get_tags() {
    const tags = await Tag.find();
    return {
        tags: tags.map((tag) => {
            return tag.name;
        })
    };
}

// Exports
export {
    get_tags
};