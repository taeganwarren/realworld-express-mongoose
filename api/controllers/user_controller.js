import bcrypt from 'bcrypt';
import validator from 'validator';
import User from "../models/User.js";

async function create_user(email, username, password) {
    const hash = await bcrypt.hash(password, 10);
    const new_user = new User({
        email: email,
        username: username,
        password: password
    });
    try {
        await new_user.validate(['email', 'username', 'password']);
        new_user.password = hash;
        await new_user.save();
    } catch (err) {
        const validation_errors = { errors: { body: [] } };
        for (const error in err.errors) {
            validation_errors.errors.body.push(err.errors[error].message);
        }
        return validation_errors;
    }
    return new_user.format_user_response();
}

async function get_user(email, password) {
    if (!validator.isEmail(email)) {
        return { errors: { body: ["Email must be a valid email address"] } };
    }
    const existing_user = await User.findOne({ email: email }, 'email username password bio image').exec();
    if (!existing_user || !(await bcrypt.compare(password, existing_user.password))) {
        return { errors: { body: ["Invalid email or password"] } };
    }
    return existing_user.format_user_response();
}

async function update_user() {
    console.log('user controller');
}

export { 
    create_user,
    get_user,
    update_user
}