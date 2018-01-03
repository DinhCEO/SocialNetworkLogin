require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const bodyParser   = require('body-parser');
const nunjucks     = require('nunjucks');
const authProvider = require('./auth/auth.provider');
const Credential   = require('./auth/credentials');

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
