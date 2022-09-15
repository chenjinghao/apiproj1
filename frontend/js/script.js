//Buttons
function addaccountButton() {
    location.href = "/addaccount"
}
function monthlycontButton() {
    location.href = "/monthlycont"
}
function dashboardButton() {
    location.href = "/dashboard"
}

function savehouseButton() {
    location.href = "/savehouse"
}

//Redirect click on icon to welcome page
function homeIconClick() {
    location.href = "/welcome"
}

app.get('/', (req, res) => {
    let user = data.get_user_by_user_id(req.query.user_id);
    res.send(JSON.stringify(req.oidc.user));
    userName.innerHTML = res.status(200).send(user.given_name);
  });