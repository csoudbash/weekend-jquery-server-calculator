$(document).ready(onReady);
let operator;

function onReady() {
    console.log('jquery is loaded');
    $('#equals-button').on('click',sendValues)
    $('#addition-button' ).on('click' ,additionAssignment);
    $('#subtraction-button').on('click',subtractionAssignment);
    $('#division-button').on('click',divisionAssignment);
    $('#multiplication-button').on('click',multiplicationAssignment);
}

function additionAssignment() {
     operator= '+';
    console.log($('#addition-button').text());
}
function subtractionAssignment() {
     operator = '-';
    console.log($('#subtraction-button').text());
}
function multiplicationAssignment() {
     operator = '*';
    console.log($('#multiplication-button').text());
}
function divisionAssignment() {
     operator = '/';
    console.log($('#division-button').text());
}

function sendValues() {
    let selectedOperator = operator;
    let numbersToMath = {
        operator: selectedOperator,
        firstNumber: Number($('#first-number').val()),
        secondNumber: Number($('#second-number').val()),
    }
    console.log(numbersToMath);
    $.ajax({
        // how to send them
         // sending the object to the server
        method: 'POST',
        url: '/inputs',
        data: {
            numbersToMath,
        }
    }).then(function(){
        //what happens when the request had been made
       console.log('inputs added correctly!');
       getValues();
    }).catch(function(response){
        console.log('rut ro scoob',response);
    })
    $('#second-number').val('');
    $('#first-number').val('');

}    
function getValues() {
    $.ajax({
        method: 'GET',
        url: '/mathResults'
    }).then(function(response){
        console.log('does this work??');
        // console.log(response);
        appendMathToDom(response);
    })
}

function appendMathToDom(listOfProblems) {
    console.log(listOfProblems);
    $('#unordered-list').empty();
    //used for appending the answer to the most recent math problem onto the screen above the history of the math
    // for (problem of listOfProblems[listOfProblems.length-1]) { 
    //     $('#table').append(`

    //     `)
    // }
    //used for appending the history of previous guesses to the dom
    for (let problem of listOfProblems) {
        $('#unordered-list').append(`<li>
        ${problem.firstNumber} ${problem.operator} ${problem.secondNumber} = ${problem.result}
        </li>`)
    }
}
// newObject = {
//     result: result,
//     firstNumber: firstInput,
//     secondNumber: secondInput,
//     operator: input.operator,  
// }