import express from 'express';
import env from 'dotenv';
const app = express();
env.config();
const port = process.env.port || 3000;
app.get('/', (req, res) => {
    res.send('hlo shahid');
}).listen(port, () => {
    console.log('it is running');
});
