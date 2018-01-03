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
    let typeLogin   = req.query['type'];
    if (!accessToken || !typeLogin) {
        return res.status(400).json({msg: 'Login failed!'})
    }
    let userFormat = {};
    if (typeLogin === 'facebook') {
        let options = {
            uri    : 'https://graph.facebook.com/me',
            qs     : {
                access_token: accessToken,
                fields      : 'last_name,name,email,gender,first_name,birthday,link,website,picture'
            },
            headers: {
                'User-Agent': 'Authenticate-Facebook'
            },
            json   : true
        };
        request(options)
            .then(user => {
                userFormat.email  = user.email;
                userFormat.avatar = user.picture.data.url;
                userFormat.name   = user.name;
                userFormat.link   = user.link;
                userFormat.size   = 50;
                res.render('profile.html', {user: userFormat});
            })
            .catch(() => {
                res.redirect('/login')
            });
    } else if (typeLogin === 'google') {
        let optionsGoogle = {
            uri    : 'https://www.googleapis.com/plus/v1/people/me',
            qs     : {
                access_token: accessToken,
            },
            headers: {
                'User-Agent': 'Authenticate-Google'
            },
            json   : true
        };
        request(optionsGoogle)
            .then(user => {
                userFormat.email  = user.emails[0].value;
                userFormat.avatar = user.image.url;
                userFormat.name   = user.displayName;
                userFormat.link   = user.url;
                userFormat.size   = 50;
                res.render('profile.html', {user: userFormat});
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/login')
            });
    }
});
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
