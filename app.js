const express = require('express');
const qrcode = require('qrcode');
const ejs = require('ejs');
const path = require('path');
const { log } = require('console');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

const staticFilesDirectory = path.join(__dirname, 'public');
app.use(express.static(staticFilesDirectory));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.render('index', { title: 'QR Code Generator', img: ''});
});

app.post('/', (req, res) => {
    const url = req.body.url;
    console.log(`Generating QR-code for ${url}...`);

    qrcode.toDataURL(url, (err, src) => {
        if(err) res.status(404).send('Something went Wrong');

        res.render('index', { title: 'QR Code Generator', img: src});
    })
})

app.listen(port, () => console.log(`Server is running on https://localost:${port}`));