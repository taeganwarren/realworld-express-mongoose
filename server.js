import express from 'express';
import connectToDatabase from './utils/mongodb.js';
import v1_router from './api/routes/router.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(v1_router);

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        // TODO: Seperate this into a logger
        if (process.env.NODE_ENV == 'development') console.log(`Example app listening on port: ${PORT}`);
    });
});

export default app;