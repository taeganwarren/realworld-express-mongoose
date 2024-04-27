import express from 'express';
import v1_router from './api/v1/router.js';
import connect_to_db from './utils/mongodb.js';
const PORT = process.env.PORT || 3000;

await connect_to_db();

const app = express();
app.use(v1_router);

app.listen(PORT, async function () {
    console.log(`Example app listening on port: ${PORT}`);
});
