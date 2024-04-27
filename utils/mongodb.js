import mongoose from "mongoose";

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

function connectToDatabase() {
    return mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`)
        .then(() => {
            console.log(`Connected to MongoDB Database at: ${MONGO_HOST}:${MONGO_PORT}`);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

export default connectToDatabase;