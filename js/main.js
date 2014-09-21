// Initialize Parse
Parse.initialize("fDtFG7b6I2GY7y6rYyNcW0kw9fcz7aUxm8lwdszI", "56XSOXSv9dPh0aDrSGDKVXwWcZ3mWQkyAZAmVMDP");

var currentUser = Parse.User.current();
console.log(currentUser);
if (currentUser) {
    document.getElementById('user').innerHTML = currentUser.username;
    
} else {
    alert('You are not signed in!');
    window.location.replace('http://swagswap.me');
}