
The vendors folder must contain all the vendors JSON files.
The program only reads the JSON files in that folder.

The template used is EJS and that means that you must install ejs because we will require it.
Among other dependencies are body-parser,express,fs and path.
The server used is express.

The file "vendor_modules.js" is imported into the server.js because that is where the files are read and the json data imported to the server.
Part 5d is not implemented.


//Running instructions:

1. install dependencies one by one:
                                npm install express 
                                npm install ejs
                                npm install fs
                                npm install path 
                                npm install body-parser


2. Then cd to the directory, then you start by simply typing "node server.js"
3. In the browser type "http://localhost:3000/"


//Instructions for Postman:

GET/vendors:
            http://localhost:3000/vendors


GET/addvendor:
              http://localhost:3000/addvendor


GET /vendors/:vendorID:
                
                Staples: http://localhost:3000/vendors/:0

                Indigo: http://localhost:3000/vendors/:1

                Grand And Toy: http://localhost:3000/vendors/:2

                Added Vendor : http://localhost:3000/vendors/:3


POST/vendors:

            http://localhost:3000/vendors

To add a new vendor to the server data place the url above in postman 
and then place the data below in the body by selecting body -> raw -> JSON

         {           
             "name": "Chapters",
             "min_order": 56,
             "delivery_fee": 5
          }


PUT /vendors/:vendorID:

First place url in postman:
                http://localhost:3000/vendors/:id

Then click param and add the value:

Example:

            Key:          Value:
           -------      ----------
              id             2
