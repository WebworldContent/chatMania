import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hi i m working..')
});

app.listen(PORT, () => {console.log(`Running on port : ${PORT}`)});
