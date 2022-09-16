const express = require('express');
const data = require("./data");
const app = express();
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../', '/frontend/');

// use the express-static middleware
app.use('/frontend/assets', express.static("frontend/assets"))
app.use('/frontend/css', express.static("frontend/css"))
app.use('/frontend/js', express.static("frontend/js"))

require('dotenv').config();

const { auth, requiresAuth } = require('express-openid-connect');
//const { nextTick } = require('process');
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
  res.redirect('/welcome');
}
);

app.get('/welcome', requiresAuth(), (req, res) => {
  res.sendFile(dirPath+'welcome.html');
}
);

app.get('/addaccount', requiresAuth(), (req, res) => {
  res.sendFile(dirPath+'addaccount.html');
}
);

app.get('/monthlycont', requiresAuth(), (req, res) => {
  res.sendFile(dirPath+'monthlycont.html');
}
);

app.get('/dashboard', requiresAuth(), (req, res) => {
  res.sendFile(dirPath+'dashboard.html');
});

app.get('/savehouse', requiresAuth(), (req, res) => {
  res.sendFile(dirPath+'savehouse.html');
});

app.get('/user', (req, res) => {
  let user = data.get_user_by_user_id(req.query.user_id);
  res.send(JSON.stringify(req.oidc.user));
  res.status(200).send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});