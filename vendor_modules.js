const { readFileSync,readdirSync } = require("fs");
const path = require('path');
const directoryPath = path.join(__dirname, 'vendors/');
const files = readdirSync(directoryPath);

var data=[];//This is the array where the data from all files are loaded.

for( i = 0 ; i <files.length; i++) //Each file in the vendors directory is read and pushed into the array
{
	data.push(JSON.parse(readFileSync(directoryPath+files[i])));
}

module.exports = {data};//The array is then exported