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
	response.render('bulletin.ejs', {'info.json': require.posts});

var data = fs.readFileSync('info.json');
var postArr = JSON.parse(data);




})

var data = fs.readFileSync('info.json');
var postArr = JSON.parse(data);



app.post('/bulletin/add/', url, function(request, response){

	var user = request.body.username;
	var post = request.body.newpost;
  
    var obj = {}
    obj[user] = post
      postArr.posts.push(obj)
  fs.writeFile("./info.json", JSON.stringify(postArr), (err) => {
   if (err) {
       console.error(err);
       return;
   };
   console.log("File has been created");
});

console.log(obj)

})



app.use(function(req, res, next){
    res.redirect('/bulletin');
})

app.listen(3000);
console.log("listening");
// app.post('/bulletin/add/', urlencodedParser)
