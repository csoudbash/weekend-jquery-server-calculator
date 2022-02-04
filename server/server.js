const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
// checking if the server is working!
console.log('hello!');


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })


  //post response is used as a 'thumbs up' basically saying that the information sent was recieved while the request is the information that waas sent
  //get is used any time data is grabbed from the server or from the client