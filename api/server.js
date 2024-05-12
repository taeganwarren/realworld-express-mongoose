import express from 'express';
import connect_to_database from '../utils/mongodb.js';
import v1_router from './routes/router.js';

const PORT = process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(v1_router);
app.use('*', (req, res) => {
    res.status(404).json({ 'error': 'not found' });
});

connect_to_database().then(() => {
    app.listen(PORT, () => {
        console.log(`API listening on port: ${PORT}`);
    });
});

export default app;