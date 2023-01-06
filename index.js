const express = require('express')();
const PORT = 8080;

const { v4 } = require('uuid');

express.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

express.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});



const tokens = [
    "memoli",
    "onur",
    "ravlico"
]

express.get('/random:start:end', (req, res) => {
    res.status(200).send({
        random: Math.floor(Math.random() * 10)
    })
})

express.get('/kahve', (req, res) => {
    if (tokens.includes(req.get('cookie'))) {
        res.status(200).send({
            kahve: 'guzeldir',
            visual: '☕'
        })
        console.log("token provided. " + Date.now())
    } else {
        res.status(401).send({
            FatalError: "No token provided."
        })
        console.log("no token provided. " + Date.now())
    }
});

express.listen(
    PORT,
    () => {
        console.log("Server is running on port: " + PORT);
    }
)