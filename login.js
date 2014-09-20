// Initialize Parse
  Parse.initialize("fDtFG7b6I2GY7y6rYyNcW0kw9fcz7aUxm8lwdszI", "56XSOXSv9dPh0aDrSGDKVXwWcZ3mWQkyAZAmVMDP");
  
  window.fbAsyncInit = function() {

    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '742900129109809', // Facebook App ID
      status     : true, // check Facebook Login status
      cookie     : true, // enable cookies to allow Parse to access the session
      xfbml      : true,
      //version    : 'v2.1'
    });


    console.log('sdk loaded');

    var fbBtn = document.getElementById('fb');
    fbBtn.addEventListener("click", function(){

        Parse.FacebookUtils.logIn("email", {
        success: function(user) {
          if (!user.existed()) {
            console.log('existed');
          }
          else {
            console.log('logged in');
          }

          console.log(user);
          // Handle successful login
          /*document.getElementById('welcome').innerHTML = "Let's Get Some";
          document.getElementById('first').innerHTML = "Swaggathon";
          document.getElementById('second').innerHTML = "Swagger";


          window.location.replace("http://swagswap.me/main.html"); */
        },
        error: function(user, error) {
          console.log(error);
          // Handle errors and cancellation
        }
      }); 
    });
    
  };
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));