import slugify from "slugify";
import Article from "../models/Article.js";
import User from "../models/User.js";

async function get_feed() {
    return;
}

async function get_global_feed() {
    return;
}

async function create_article(id, title, description, body, tagList) {
    const author = await User.findById(id);
    const new_article = new Article({
        title: title,
        slug: slugify(title, { lower: true }),
        description: description,
        body: body,
        tag_list: tagList,
        author: author._id
    });
    await new_article.save();
    return {
        title: new_article.title,
        description: new_article.description,
        body: new_article.body,
        tag_list: new_article.tag_list,
        created_at: new_article.created_at,
        author: {
            username: author.username,
            bio: author.bio,
            image: author.image
        }
    };
}

async function get_article(id, slug) {
    return;
}

async function update_article(slug) {
    return;
}

async function delete_article(slug) {
    return;
}

export {
    get_feed,
    get_global_feed,
    create_article,
    get_article,
    update_article,
    delete_article
}