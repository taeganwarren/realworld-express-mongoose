import express from 'express';
import connectToDatabase from './utils/mongodb.js';
import v1_router from './api/v1/routes/router.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(v1_router);

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on port: ${PORT}`);
    });
});