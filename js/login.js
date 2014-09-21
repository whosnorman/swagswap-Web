// Initialize Parse
Parse.initialize("fDtFG7b6I2GY7y6rYyNcW0kw9fcz7aUxm8lwdszI", "56XSOXSv9dPh0aDrSGDKVXwWcZ3mWQkyAZAmVMDP");


var btnCont = document.getElementById('btnCont');
var btnSignin = document.getElementById('login');
var btnCreate = document.getElementById('signup');
var signinForm = document.getElementById('frontsignin');
var createForm = document.getElementById('frontcreateaccount');

btnSignin.addEventListener('click', function(){
  classie.addClass(btnCont, 'fadeOut');

  setInterval(function(){ 
    btnCont.style.display = 'none';
    classie.removeClass(btnCont, 'fadeOut');
    classie.addClass(signinForm, 'fadeIn');
    signinForm.style.display = 'block';
   
    setInterval(function(){
      classie.removeClass(signinForm, 'fadeIn');
      signinForm.style.opacity = 1;
    }, 700);
  }, 700);
  
});

btnCreate.addEventListener('click', function(){
  classie.addClass(btnCont, 'fadeOut');

  setInterval(function(){ 
    btnCont.style.display = 'none';
    classie.removeClass(btnCont, 'fadeOut');
    classie.addClass(createForm, 'fadeIn');
    createForm.style.display = 'block';
   
    setInterval(function(){
      classie.removeClass(createForm, 'fadeIn');
      createForm.style.opacity = 1;
    }, 700);
  }, 700);
  
});

btnCreate.addEventListener('click', function(){
  classie.addClass(btnCont, 'fadeOut');
  classie.addClass(createForm, 'fadeIn');


});


document.getElementById('createSubmit').addEventListener('click', function(){

  var form = document.getElementById('frontcreateaccount');
  var name = form.children[0].value;
  var college = form.children[1].value;
  var email = form.children[2].value;
  var pass = form.children[3].value;

  console.log(name + ' ' + college + ' ' + email);


    var user = new Parse.User();

    user.set("username", name);
    user.set("password", pass);
    user.set("email", email);
    user.set("college", college);

    user.signUp(null, {
      success: function(user) {
        classie.addClass(createForm, 'fadeOut');
        setInterval(function(){
          classie.removeClass(createForm, 'fadeOut');
          createForm.style.display = 'none';
        }, 700);

        welcome();
      },
      error: function(user, error) {
        alert("error: " + error.code + ' ' + error.message);
    }
    });
});

document.getElementById('signinSubmit').addEventListener('click', function(){
  var username = document.getElementById('frontsignin').children[0].value;
  var pass = document.getElementById('frontsignin').children[1].value;

  Parse.User.logIn(username, pass, {
  success: function(user) {
    // Do stuff after successful login.
    classie.addClass(signinForm, 'fadeOut');
        setInterval(function(){
          classie.removeClass(signinForm, 'fadeOut');
          signinForm.style.display = 'none';
        }, 700);

        welcome();
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
    alert("error: " + error.code + ' ' + error.message);
  }
  });
});

function welcome() {
  setTimeout(function(){
      window.location.replace("main.html"); 
    }, 2000);

  document.getElementById('welcome').innerHTML = "Let's Get Some";
  var swag = document.getElementById('first');
  swag.innerHTML = "Swaggathon";

  var swagger = document.getElementById('second');
  swagger.innerHTML = "Swagger";

  document.getElementById('swagswap').className = "swagswapTwo";
}

