const express = require("express"); //import the express module
const { readFileSync } = require("fs"); //import the file system module
const fs = require("fs");
const {data} = require("./vendor_modules"); //The data is imported from the vendor_modules file which is in the same directory as server.js
const app = express(); //instantiate the express module
const bodyParser = require('body-parser'); //import the body-parser module

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs'); //set the view engine to ejs
app.use(bodyParser.json());

app.get("/", (req,res) => { //render the home.ejs when request is sent on localhost:3000/
	res.render('home');

});

app.get("/vendors", (req,res) => { 
	
	if (req.headers["accept"].includes("text/html")) //Check if the requested response should be html page else json
		res.render('vendorsList',{"vendors":data});
	else
		res.send({"vendors":data});
});

app.get("/addvendor", (req,res) => { //Called when localhost:3000/addvendor
	res.render('addVendor');
});

app.post("/vendors", urlencodedParser, (req,res) => { //called to change details of vendor
	
	id = 0;
	newVendor={};
	for( i = 0 ; i < data.length; i++) //lop through to get the next id that should be assigned to new vendor
	{
		if( parseInt(data[i].id) > id)
			id = data[i].id;
	}

	
	if(req.body.name==null) //if name is null send bad request response
		res.sendStatus(400);
	else if(req.body.delivery_fee ==null)//if delivery_fee is null send bad request response
		res.sendStatus(400);
	else if(req.body.min_order ==null)//if min_order is null send bad request response
		res.sendStatus(400);
	else{
		newVendor.id = id+1; //the last vendor id incremented will be the new id for the new vendor
		newVendor.name = req.body.name;
		newVendor.min_order = parseInt(req.body.min_order);
		newVendor.delivery_fee = parseFloat(req.body.delivery_fee);


		
		data.push(newVendor); //add the new vendor to the list of vendors
		res.status(200).json(newVendor);//send the list of vendors
	}
});

app.get("/vendors/:id", (req,res) => { //get the details of a vendor by id
	
	var id = req.params.id.replace(':',''); //remove the : to get the id
	
	askedVendor = {};
	for( i = 0 ; i < data.length; i++)//loop through the list of vendors to check the vendor requested
	{
		if( parseInt(data[i].id) == id)
		{
			askedVendor = data[i];
			i=data.length;
		}
	}
	
	if (req.headers["accept"].includes("text/html"))//return the html of the requested vendors details
		res.render('vendor_Changes',{"vendors":askedVendor});
	else//return the json of the requested data
		res.json(askedVendor);
});

app.put("/vendors/:id", (req,res) => { //used to change some details of vendor
	
	var id = req.params.id.replace(':','');//get the id by removing the :
	var result = false;
	toChangeVendor = {};
	//changing the name, min_order,delivery_fee and adding new supply if provided
	for( i = 0 ; i < data.length; i++) //loop through the list to check the details specific of a vendor to change
	{
		if( parseInt(data[i].id) == parseInt(id))//if found then change the name,min_order,delivery_fee
		{
			data[i].name = req.body.name;
			data[i].min_order = parseInt(req.body.min_order);
			data[i].delivery_fee = parseFloat(req.body.delivery_fee);
			result = true;

			if(req.body.newname !='' && req.body.description !='' && req.body.stock !='' && req.body.price != '')//if the supply is to be changed
			{
				var details ={};
				details.name = req.body.new_name;
				details.description = req.body.description;
				details.stock = parseInt(req.body.stock);
				details.price = parseFloat(req.body.price);
				index = 0;
				for(var k in data[i].supplies)//loop through the supply to get the right index of the category
				{
					for(var j in data[i].supplies[k])
					{
						if(parseInt(j) > index)
						{
							index = j;
						}
					}
				}
				index++;
				data[i].supplies[req.body.category][index]=details;//add to that category
			}
			toChangeVendor = data[i];
			i=data.length;
		}
	}
	if( result )
		res.status(200).json(id);//send the id of the vendor whose details has been changed.
	else res.sendStatus(404);// if not changed then send 404 error
});


app.listen(3000);