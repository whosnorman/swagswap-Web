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
function createItem(brand, imageFile, cat, size) {

	var Item = Parse.Object.extend("Item");
	var newItem = new Item();

	newItem.set("brand", brand);
	newItem.set("size", size);
	newItem.set("category", cat);
	newItem.set("owner", currentUser);
	newItem.set("imageFile", imageFile);

	newItem.save(null, {
		success: function(newItem) {
			// flash name green
			alert(newItem.id + ' item created');
		},
		error: function(newItem, error) {
			//flash name red
			console.log("error: " + error.message);
		}
	})

}

// Add Item pop up box
$('#plusBtn').click(function(e) {
    $('#addItem').lightbox_me({
        centered: true, 
        onLoad: function() { 
            $('#addItem').find('input:first').focus();
            }
        });
    e.preventDefault();

    $('#confirm').click(function(e) {
    	var form = document.getElementById('itemForm');
    	e.preventDefault();
    	// get regular values
	    var brand = form.children[0].children[0].value;
	    var cat = form.children[2].value;
	    var size = form.children[3].value;

	    // clean up
	    form.children[0].children[0].value = '';

	    // image handling
	    var fileUploadControl = $('#photoUpload')[0];
	    if (fileUploadControl.files.length > 0) {
	    	var file = fileUploadControl.files[0];
	    	var fileName = "photo.png";

	    	var parseFile = new Parse.File(name, file);
	    	parseFile.save().then(function() {
			  // The file has been saved to Parse.
			  console.log('saved image');
			}, function(error) {
			  // The file either could not be read, or could not be saved to Parse.
				console.log("error: " + error.message);
			});
	    }

	    //console.log(brand + ' ' + image + ' ' + size + ' ' + cat);
		console.log('creating item');
		createItem(brand, parseFile, cat, size);

		$('#confirm').trigger('close');

	});
    

});

function queryAllItems() {
	var Item = Parse.Object.extend("Item");
	var query = new Parse.Query(Item);
	query.notEqualTo('owner', currentUser);

	// straight here for all items
	query.find({
		success: function(results) {
			console.log('success ' + results.length);

			for (var i = 0; i < results.length; i++) {
				loadToGallery(results[i]);
				//console.log(results[i].get('brand'));
			}
		},
		error: function(error) {
			console.log("error: " + error.message);
		}
	});
}

function queryUserItems() {
	var Item = Parse.Object.extend("Item");
	var query = new Parse.Query(Item);

	query.equalTo('owner', currentUser);
	query.find({
		success: function(results) {
			console.log('success ' + results.length);

			for (var i = 0; i < results.length; i++) {
				loadToBag(results[i]);
				//console.log(results[i].get('brand'));
			}
		},
		error: function(error) {
			console.log("error: " + error.message);
		}
	});
}

// queries for different categories
function queryItems(cat) {
	var Item = Parse.Object.extend("Item");
	var query = new Parse.Query(Item);

	query.equalTo('category', cat);
	query.notEqualTo('owner', currentUser);
	query.find({
		success: function(results) {
			console.log('success ' + results.length);

			for (var i = 0; i < results.length; i++) {
				loadToGallery(results[i]);
				//console.log(results[i].get('brand'));
			}
		},
		error: function(error) {
			console.log("error: " + error.message);
		}
	});
}


// create full DOM element and append to gallery
function loadToGallery(item) {
	var cat = item.get('category');
	var brand = item.get('brand');
	var photo = item.get('imageFile');


	var fig = document.createElement('figure');
	fig.className = "item";
	if(photo) {
		fig.style.backgroundImage = "url('" + photo.url() + "')";
		fig.style.backgroundSize = 'cover';
	}

	var cap = document.createElement('figcaption');
	var h = document.createElement('h2');
	var span = document.createElement('span');
	span.innerHTML = cat;

	h.innerHTML = brand + ' ';
	h.appendChild(span);

	cap.appendChild(h);
	fig.appendChild(cap);
	//console.log(fig);

	document.getElementById('gallery').appendChild(fig);
}

function clearGallery() {
	document.getElementById('gallery').innerHTML = '';
}

function loadToBag(item) {
	var div = document.createElement('div');
	div.className = 'itemSmall';

	div.style.backgroundImage = "url('" + item.get('imageFile').url() + "')";
	div.style.backgroundSize = 'cover';

	document.getElementById('bag').appendChild(div);
}

//queryAllItems();
//queryUserItems();

function categories() {
	var cont = document.getElementById('categories');
	var list = cont.children[0];

	// all
	list.children[0].addEventListener("click", function(){
		queryAllItems();
		resetCat();
		list.children[0].className = 'selected';
	});

	// shirts
	list.children[1].addEventListener("click", function(){
		queryItems('Shirt');
		resetCat();
		list.children[1].className = 'selected';
	});

	// stickers
	list.children[2].addEventListener("click", function(){
		queryItems('Sticker');
		resetCat();
		list.children[2].className = 'selected';
	});

	// headwear
	list.children[3].addEventListener("click", function(){
		queryItems('Headwear');
		resetCat();
		list.children[3].className = 'selected';
	});

	// gadgets
	list.children[4].addEventListener("click", function(){
		queryItems('Gadgets');
		resetCat();
		list.children[4].className = 'selected';
	});

	// misc
	list.children[5].addEventListener("click", function(){
		queryItems('Misc');
		resetCat();
		list.children[5].className = 'selected';
	});

	function resetCat(){
		for(var i = 0; i < 6; i++) {
			cont.children[0].children[i].className = '';
		}

		clearGallery();
	}
}

categories();