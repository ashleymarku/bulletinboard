var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');

var url = bodyParser.urlencoded({extended:false});

var app = express();



app.set('view engine', 'ejs')





app.use(function(require, response, next){
	if (typeof(require.bulletin) == 'undefined'){
		require.bulletin = []
	}
	next();

})

app.get('/bulletin', function(require, response){
	response.render('bulletin.ejs', {bulletin: require.bulletin});




})

app.post('/bulletin/add/', url, function(request, response){

	var data = request.body.newpost;
	var data2 =request.newuser;
  
  fs.writeFile("./info.json", JSON.stringify(data, data2), (err) => {
   if (err) {
       console.error(err);
       return;
   };
   console.log("File has been created");
});

console.log(data)

})



app.use(function(req, res, next){
    res.redirect('/bulletin');
})

app.listen(8080);
console.log("listening");
// app.post('/bulletin/add/', urlencodedParser)


