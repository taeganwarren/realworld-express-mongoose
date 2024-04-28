import mongoose from "mongoose";

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "conduit";

function connectToDatabase() {
    return mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`)
        .then(() => {
            // TODO: Separate this into a logger
            if (process.env.NODE_ENV == 'development') console.log(`Connected to MongoDB Database at: ${MONGO_HOST}:${MONGO_PORT}`);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

export default connectToDatabase;