var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

/*
app.use("/public", express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/public/js'));
*/
app.use("", express.static(__dirname + ''));


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
   console.log("Listening on " + port);
});