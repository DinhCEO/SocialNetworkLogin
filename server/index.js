require('dotenv').config();
const express          = require('express');
const cors             = require('cors');
const bodyParser       = require('body-parser');
const nunjucks         = require('nunjucks');
const authProvider     = require('./auth/auth.provider');
const Credential       = require('./auth/credentials');
const TwitterService   = require('./auth/service/twitter-service');
const InstagramService = require('./auth/service/instagram-service');
const twitterService   = new TwitterService();
const instagramService = new InstagramService();

const app                     = express();
const PORT                    = process.env.PORT;
const FB_APP_ID               = process.env.fb_app_id;
const TWITTER_LINK            = process.env.twitter_link;
const INSTAGRAM_CLIENT_ID     = process.env.instagram_client_id;
const INSTAGRAM_CALLBACK_URL  = process.env.instagram_callback_url;

app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));
nunjucks.configure('views', {
    express   : app,
    autoescape: true
});


app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get('/login', (req, res) => {
    res.render('login.html', {fb_app_id: FB_APP_ID});
});
let request_token_secret;
app.get('/twitter/login', (req, res) => {
    twitterService.getRequestToken()
        .then(({requestToken, requestTokenSecret}) => {
            request_token_secret = requestTokenSecret;
            res.status(200).json({requestToken, requestTokenSecret, link: TWITTER_LINK + requestToken});
        })
        .catch(() => {
            return res.redirect('/login');
        });
});

app.get('/instagram/login', (req, res) => {
    res.status(200).json({link: `https://api.instagram.com/oauth/authorize/?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_CALLBACK_URL}&response_type=code`});
});

app.get('/instagram/callback', (req, res) => {
    let code = req.query['code'];
    if (!code) {
        return res.status(400).json({msg: 'Login by instagram failed!'})
    }
    instagramService.getProfile(code)
        .then((result) => {
            let userFormat    = {};
            userFormat.email  = '';
            userFormat.name   = result.user['full_name'];
            userFormat.avatar = result.user['profile_picture'];
            userFormat.link   = '';
            userFormat.size   = 50;
            res.render('profile.html', {user: userFormat});
        })
        .catch(() => {
            return res.redirect('/login');
        });
});

app.get('/twitter/callback', (req, res) => {
    let oauth_token    = req.query['oauth_token'];
    let oauth_verifier = req.query['oauth_verifier'];
    if (!oauth_token || !oauth_verifier) {
        return res.status(400).json({msg: 'Login by twitter failed!'})
    }
    twitterService.accessToken(oauth_token, request_token_secret, oauth_verifier)
        .then(({accessToken, accessSecret}) => {
            return twitterService.verifyCredentials(accessToken, accessSecret, {
                include_email   : true,
                include_entities: true,
                skip_status     : false
            });
        })
        .then((user) => {
            let userFormat    = {};
            userFormat.email  = '';
            userFormat.name   = user.name;
            userFormat.avatar = user['profile_image_url'];
            userFormat.link   = user.url;
            userFormat.size   = 50;
            res.render('profile.html', {user: userFormat});
        })
        .catch(() => {
            return res.redirect('/login');
        });
});


app.get('/getProfile', (req, res) => {
    let accessToken = req.query['accessToken'];
    let typeLogin   = req.query['type'];
    if (!accessToken || !typeLogin) {
        return res.status(400).json({msg: 'Login failed!'})
    }
    let credential = new Credential(accessToken);
    let auth       = authProvider.getAuth(typeLogin);

    auth.login(credential.getCredential())
        .then(user => {
            res.render('profile.html', {user: user});
        })
        .catch(() => {
            return res.redirect('/login');
        });

});
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
