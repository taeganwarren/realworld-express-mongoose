import express from 'express';
import api_router from './api/router.js';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(api_router);

app.listen(PORT, async function () {
    console.log(`Example app listening on port: ${PORT}`);
});
