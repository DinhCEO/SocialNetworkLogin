require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
var nunjucks     = require('nunjucks');

const app  = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
nunjucks.configure('pages', {
    express   : app,
    autoescape: true
});
app.get('/', function (req, res) {
    res.render('index.html',{data:'dinhceo'});
});

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
