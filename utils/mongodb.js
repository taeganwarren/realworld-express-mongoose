import mongoose from 'mongoose';

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

function connect_to_database() {
    // TODO: Handle database disconnects
    return mongoose.connect(MONGO_CONNECTION_STRING)
        .then(() => {
            // TODO: Separate this into a logger
            if (process.env.NODE_ENV == 'development') console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

export default connect_to_database;