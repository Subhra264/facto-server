const express = require('express');
const { URL } = require('url');
const fetch = require('node-fetch');
const Router = express.Router();

Router.post('/check-fact', async (req, res, next) => {
    try {
        const searchEndPoint = new URL(`${process.env.ELASTIC_CLOUD_API_SEARCH_ENDPT}?query=${req.body.q}`);

        const response = await fetch(searchEndPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.ELASTIC_CLOUD_API_PUB_SEARCH_KEY}`
            }
        });

        const result = await response.json();

        res.json({
            result: result.results
        });

    } catch(err) {
        next(err);
    }

});

module.exports = Router;