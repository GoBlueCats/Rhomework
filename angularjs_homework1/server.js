//create express module
var express = require('express');
var app = express();
//using function and command in the express module
//test server run correctly
//set router to our index page
console.log("before app.get");


/*
app.get('/', function(req,res){
    res.send('Hello world from server.js')
});
*/

//using html file as the template for our app
//use express command to tell server where to find file
//static(html or css)
//public: the folder which contain those files;

app.use(express.static(__dirname + "/public"));

app.get('/contactlist',function(req,res){
        console.log("I receive a GET request");
        //set up psql module
        var pg = require('pg');
        var conString = "postgres://tianzhang:199329@localhost:5432/zth";

        var client = new pg.Client(conString);
        client.connect();


        const results = [];
        var query = client.query("select Sub1, Oxr1, Sod1, age from patientexpression,patientinfo where patientexpression.id = patientinfo.id");


        query.on('row', function(row) {
            console.log(row);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
            //console.log(end_return);
        });

});

console.log("after app.use");




app.listen(3000);
console.log("Server running on port 3000");
