const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(express.json());

app.use(require('./routes/api.route'));

app.use(async (req, res, next) => {
    console.log('Endpoint doesn\'t exist');

    const error = new Error('Endpoint doesn\'t exist');
    error.status = 400;

    next(error);
});


app.use(async (err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});