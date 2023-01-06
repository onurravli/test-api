const app = require('express')();
const PORT = 8080;

const tokens = [
    "memoli",
    "onur",
    "ravlico"
]

app.get('/random', (req, res) => {
    res.status(200).send({
        random: Math.floor(Math.random() * 10)
    })
})

app.get('/kahve', (req, res) => {
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

app.listen(
    PORT,
    () => {
        console.log("Server is running on port: " + PORT);
    }
)