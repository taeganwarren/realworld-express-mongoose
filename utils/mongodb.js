import mongoose from 'mongoose';

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

function connect_to_database() {
    return mongoose.connect(MONGO_CONNECTION_STRING)
        .then(() => {
            //console.log('Connected to MongoDB');
        });
}

export default connect_to_database;