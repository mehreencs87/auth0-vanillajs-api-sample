$(document).ready(function() {
    var widget = new Auth0Widget({
        domain: 'samples.auth0.com',
        clientID: 'BUIJSW9x60sIHBw8Kd9EmCbj8eDIFxDC',
        callbackURL: location.href,
        callbackOnLocationHash: true
    });
    
    var userProfile;

    document.getElementById('btn-login').addEventListener('click', function() {
      widget.signin({ popup: true} , null, function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          // Save the JWT token.
          localStorage.setItem('userToken', token);

          // Save the profile
          userProfile = profile;

          document.getElementById('login-box').style.display = 'none';
          document.getElementById('logged-in-box').style.display = 'inline';

          document.getElementById('nick').textContent = profile.nickname;
        }
      });
    });

    
    document.getElementById('btn-api').addEventListener('click', function() {
        // Just call your API here. The header will be sent
    })

    
});