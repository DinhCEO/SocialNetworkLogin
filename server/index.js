require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const nunjucks   = require('nunjucks');
const request    = require('request-promise');

const app       = express();
const PORT      = process.env.PORT;
const FB_APP_ID = process.env.fb_app_id;
app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));
nunjucks.configure('pages', {
    express   : app,
    autoescape: true
});
app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get('/login', (req, res) => {
    res.render('login.html', {fb_app_id: FB_APP_ID});
});
app.get('/getProfile', (req, res) => {
    let accessToken = req.query['accessToken'];
    if (!accessToken) {
        return res.status(400).json({msg: 'Login failed!'})
    }
    let options = {
        uri    : 'https://graph.facebook.com/me',
        qs     : {
            access_token: accessToken,
            fields      : 'last_name,name,email,gender,first_name,birthday,link,website,picture'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json   : true
    };
    request(options)
        .then(user => {
            res.render('profile.html', {user: user});
        })
        .catch(() => {
            res.redirect('/login')
        });
});
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
