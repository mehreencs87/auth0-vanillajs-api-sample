var lock = new Auth0Lock(
    // These properties are set in auth0-variables.js
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
    {
        auth: {
            params: {scope: 'openid'}
        }
    }
);

document.getElementById('btn-login').addEventListener('click', function () {
    lock.show();
});

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    showLoggedIn();
  });
});

var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    document.getElementById('nick').textContent = profile.name;
  });
}

// Display the user's profile
function showLoggedIn() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('logged-in-box').style.display = 'inline';
    var profile = JSON.parse(localStorage.getItem('profile'));
    document.getElementById('nick').textContent = profile.nickname;
}
