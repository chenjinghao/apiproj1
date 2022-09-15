// demonstration of using Auth0 to login users before allowing access to endpoints
// to step through this, see James Quick's video tutorial at https://www.youtube.com/watch?v=QQwo4E_B0y8

const express = require('express');
const data = require("./data");
const app = express();
const fs = require('fs');
const path = require('path');


// use the express-static middleware
app.use(express.static("frontend"))
app.use(express.static("frontend/js"))

require('dotenv').config();

const { auth, requiresAuth } = require('express-openid-connect');
const { nextTick } = require('process');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  
  res.redirect('/welcome.html');
  
  //response.send('<a href="/welcome">Login</a>')
  
  //response.sendFile(dirPath);
  //response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/welcome.html', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/addaccount.html', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/user/by-uid', requiresAuth(), (req, res) => {
    let user = data.get_user_by_user_id(req.query.user_id);
    res.status(200).send(user);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
