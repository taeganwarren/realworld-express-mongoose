import express from 'express';
import v1_router from './api/v1/router.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(v1_router);

app.listen(PORT, async function () {
    console.log(`Example app listening on port: ${PORT}`);
});
