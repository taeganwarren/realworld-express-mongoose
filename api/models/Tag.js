// Imports
import {
    Schema, model 
} from 'mongoose';
import validator from 'validator';

// Tag Schema
const tag_schema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name is required',
        unique: true,
        validate: {
            validator: (name) => {
                return validator.isLength(name, {
                    min: 1, max: 20 
                }) && validator.isAlpha(name);
            },
            message: 'Tag name must be between 1 and 20 characters long and contain only alphabetic characters'
        }
    }
});

// Check if tag exists
tag_schema.statics.exists = async function(name) {
    return await this.findOne({ name: name });
}

// Tag model
const Tag = model('Tag', tag_schema);

// Export
export default Tag;