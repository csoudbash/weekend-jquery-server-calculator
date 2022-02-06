$(document).ready(onReady);
let operator;

function onReady() {
    console.log('jquery is loaded');
    $('#equals-button').on('click',sendValues);
    $('#addition-button' ).on('click' ,additionAssignment);
    $('#subtraction-button').on('click',subtractionAssignment);
    $('#division-button').on('click',divisionAssignment);
    $('#multiplication-button').on('click',multiplicationAssignment);
    $('#clear-button').on('click', clearDom);
    getValues();
}

// functions assigned 
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
    //console.log('inputs added correctly!');
       getValues();
    }).catch(function(response){
        console.log('rut ro scoob',response);
    })
    // $('#clear-inputs').val('');
    // ask why ^^^ this doesnt work while the ones below do
    $('#second-number').val('');
    $('#first-number').val('');

}    
// getting the finished math object from the server.
function getValues() {
    $.ajax({
        method: 'GET',
        url: '/mathResults'
    }).then(function(response){
        // console.log('does this work??');
        // console.log(response);
        appendMathToDom(response);// running appendMathToDom with the object 'response' from the server side
        
    })
}

function appendMathToDom(listOfProblems) {
    let lastAnswer = listOfProblems[listOfProblems.length-1];

    $('#unordered-list').empty();// clears the history of previous math problems each time the function is ran
    $('#last-answer').empty();// clears the history of the previous last answer each time the function is ran

    //used for appending the answer to the most recent math problem onto the screen above the history of the math
    if (listOfProblems.length > 0) { //this is here so that when the page loads with nothing in the array, it doesnt try to append nothing to the screen
        $('#last-answer').append(`<h3>
                ${lastAnswer.answer}
            </h3>`)
    }
    //used for appending the history of previous guesses to the dom
    for (let problem of listOfProblems) {
        $('#unordered-list').append(`<li>
        ${problem.firstNumber} ${problem.operator} ${problem.secondNumber} = ${problem.answer}
        </li>`)
    }
}
// function to clear the dom when the C or 'clear' button is pressed
function clearDom() {
// console.log('got the clear button working???');
$.ajax({
        method: 'GET',
        url: '/clearDom'
    }).then(function(response){
        console.log('get has been sent!');
        // appendMathToDom(response);
        $('#second-number').val('');
        $('#first-number').val('');
        appendMathToDom(response);
    }).catch(function(response){
        console.log('rut ro scoob', response);
    })
}
