import mongoose from 'mongoose';

async function connect_to_db() {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`);
}

export default connect_to_db;