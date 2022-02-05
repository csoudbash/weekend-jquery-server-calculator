const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
let previousMathArray = require('./modules/previousMathArray.js')

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
// checking if the server is working!
// console.log('hello!');

app.post('/inputs',function(req,res){
    console.log('/inputs to get!', req.body.numbersToMath);
    previousMathArray.push(req.body.numbersToMath);
    doMath(req.body.numbersToMath)
    // let MostRecentInput = req.body.numbersToMath;
    res.sendStatus(201);
    console.log(previousMathArray);
})


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })


  //post response is used as a 'thumbs up' basically saying that the information sent was recieved while the request is the information that waas sent
  // generally exclusivley used as a transfer of data from the client to the server !!! double check this
  //get is used any time data is grabbed from the server or from the client

  function doMath(input) {
      console.log(input);
      let result;
        // very interesting, so these 2 lines below here are to turn the values from strings into numbers, despite the fact that on the client side
        // i ensured that they were turned into numbers before being sent over. very interesting....... need to ask liz
      let firstNumber = Number(input.firstNumber)
      let secondNumber = Number(input.secondNumber)
        // math for finding the result of the two numbers
      if (input.operator === '+') {
          result = firstNumber + secondNumber;
      }else if (input.operator === '-') {
          result = firstNumber - secondNumber;
      }else if (input.operator === '/') {
          result = firstNumber / secondNumber;
      }else if (input.operator === '*') {
          result = firstNumber * secondNumber;
      }
      console.log(result);
  }