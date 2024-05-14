// Imports
import mongoose from 'mongoose';

// Constants
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

// Connect to MongoDB
function connect_to_database() {
    return mongoose.connect(MONGO_CONNECTION_STRING)
        .then(() => {
            console.log('Connected to MongoDB');
        });
}

// Exports
export default connect_to_database;