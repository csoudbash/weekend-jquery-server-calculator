const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
let previousMathArray = require('./modules/previousMathArray.js'); // exporting the module for use on the server side
// let resultsArray = require('./modules/resultsArray');
app.use(bodyParser.urlencoded({extended:true}));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
//-----------------------------^^^^^SETTING UP SERVER STUFF^^^^^------------------------------------

// NOTES -------------------------------------------------------------------------------------------
  //post response is used as a 'thumbs up' basically saying that the information sent was recieved while the request is the information that waas sent
  // generally exclusivley used as a transfer of data from the client to the server !!! double check this
  //get is used any time data is grabbed from the server or from the client
// END NOTES ---------------------------------------------------------------------------------------

// POSTS AND GETS ----------------------------------------------------------------------------------

// grabs the values sent from the client side and sends the object to the 'doMath' function
app.post('/inputs',function(req,res){
    console.log('/inputs to get!', req.body.numbersToMath);
    doMath(req.body.numbersToMath)
    res.sendStatus(201);
    // console.log(previousMathArray);
})
// sending the entire 'previousMathArray' to the client send when requested to do so.
app.get('/mathResults',function(req, res){
    console.log('inside /mathResults', req.body);
    res.send(previousMathArray);
})
// when the server requests a clear of the screen through a button click, we simply set the 'previousMathArray'
// array to an empty array and then send back the array
app.get('/clearDom',function(req,res){
    console.log('resetting dom in progress, beep boop');
    previousMathArray= [];
    res.send(previousMathArray); 
})
// END POSTS AND GETS ------------------------------------------------------------------------------

// SERVER SIDE FUNCTIONS----------------------------------------------------------------------------
  function doMath(input) { // function called after the post statement was sent from the client side
      let result;
        // very interesting, so these 2 lines below here are to turn the values from strings into numbers, despite the fact that on the client side
        // i ensured that they were turned into numbers before being sent over. very interesting....... need to ask liz or dane.
      let firstInput = Number(input.firstNumber);
      let secondInput = Number(input.secondNumber);

        // math for finding the result of the two numbers
      if (input.operator === '+') {
          result = firstInput + secondInput;
      }else if (input.operator === '-') {
          result = firstInput - secondInput;
      }else if (input.operator === '/') {
          result = firstInput / secondInput;
      }else if (input.operator === '*') {
          result = firstInput * secondInput;
      }
      // creating a new object with all of the previous data and now including the result 
      newObject = {
          answer: result,
          firstNumber: firstInput,
          secondNumber: secondInput,
          operator: input.operator,  
      }
      previousMathArray.push(newObject);// updating the 'previousMathArray' module by pushing the new object created to it.
      console.log(result);
  }
  //  END SERVER SIDE FUNCTIONS---------------------------------------------------------------------
 
  // MORE SERVER SIDE STUFF-----------------------------------------------------------
  app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })