import express from 'express';
import pg from 'pg';

const app = express();

const { Client } = pg;
const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
await client.connect();

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(process.env.API_PORT, async function () {
    console.log(`Example app listening on port: ${process.env.API_PORT}`);
});
