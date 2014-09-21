// Initialize Parse

Parse.initialize("fDtFG7b6I2GY7y6rYyNcW0kw9fcz7aUxm8lwdszI", "56XSOXSv9dPh0aDrSGDKVXwWcZ3mWQkyAZAmVMDP");

var currentUser = Parse.User.current();
var name;
//check if logged in
if (currentUser) {
	//get current username
	currentUser.fetch().then(function(fetchedUser){
	    name = fetchedUser.getUsername();
	}, function(error){
	    //Handle the error
	    name = "Peach";
	});

    document.getElementById('user').innerHTML = name.toUpperCase();
} else {
    alert('You are not signed in!');
    window.location.replace('http://swagswap.me');
}



function createItem() {



	var Item = Parse.Object.extend("Item");
	var newItem = new Item();

	newItem.set("title", title);
	newItem.set("cat", category);
	newItem.set("user", name);



}

$('#plusBtn').click(function(e) {
    $('#addItem').lightbox_me({
        centered: true, 
        onLoad: function() { 
            $('#addItem').find('input:first').focus()
            }
        });
    e.preventDefault();
});

