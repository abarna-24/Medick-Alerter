var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/order');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var first = req.body.first;
	var last =req.body.last;
	var contact = req.body.contact;
	var pay =req.body.pay;
    var date =req.body.date;
    var address1 =req.body.address1;
    var address2 =req.body.address2;
    var city =req.body.city;
    var region =req.body.region;
    var zip =req.body.zip;
    var country =req.body.country;

	var data = {
		"first": first,
		"last":last,
		"contact":contact,
        "pay":pay,
		"date":date,
        "address1":address1,
        "address2":address2,
        "city":city,
        "region":region,
        "zip":zip,
        "country":country
	}
db.collection('order_details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
	return res.redirect('http://127.0.0.1:5500/order1.html');
})
app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('order.html');
}).listen(3000)

console.log("server listening at port 3000");