import express from 'express';
import connect_to_database from './utils/mongodb.js';
import v1_router from './api/routes/router.js';
const PORT = process.env.API_PORT || 3000;

const app = express();
app.use(express.json());
app.use(v1_router);

connect_to_database().then(() => {
    app.listen(PORT, () => {
        // TODO: Separate this into a logger
        if (process.env.NODE_ENV == 'development') console.log(`Example app listening on port: ${PORT}`);
    });
});

export default app; // For testing purposes