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


// create a new item under the current user
function createItem(brand, image, cat, size) {

	var Item = Parse.Object.extend("Item");
	var newItem = new Item();

	newItem.set("brand", brand);
	newItem.set("category", cat);
	newItem.set("owner", currentUser);
	newItem.set("imageUrl", image);

	newItem.save(null, {
		success: function(newItem) {
			// flash name green
			alert(newitem.id + ' item created');
		},
		error: function(newItem, error) {
			//flash name red
			console.log("error: " + error.code + " " error.message);
		}
	})

}

// Add Item pop up box
$('#plusBtn').click(function(e) {
    $('#addItem').lightbox_me({
        centered: true, 
        onLoad: function() { 
            $('#addItem').find('input:first').focus()
            }
        });
    e.preventDefault();

    $('#confirm').click(function(e) {
    	var form = document.getElementById('itemForm');

	    var brand = form.children[0].children[0].value;
	    var image = form.children[1].children[0].value;
	    var cat = form.children[2].value;
	    var size = form.children[3].value;

	    form.children[0].children[0].value = '';
	    form.children[1].children[0].value = '';

	    //console.log(brand + ' ' + image + ' ' + size + ' ' + cat);
		createItem(brand, image, cat, size);

	});
    

});

