import express from 'express';
import connect_to_database from '../utils/mongodb.js';
import v1_router from './routes/router.js';

const PORT = process.env.API_PORT;
const ENV = process.env.NODE_ENV;

const app = express();
app.use(express.json());
app.use(v1_router);

connect_to_database().then(() => {
    app.listen(PORT, () => {
        // TODO: Separate this into a logger
        if (ENV === 'development') console.log(`API listening on port: ${PORT}`);
    });
});

export default app; // For testing purposes