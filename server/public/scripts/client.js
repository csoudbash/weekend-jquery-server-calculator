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
    console.log($('#subtraction-button').text());
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
    }).catch(function(response){
        console.log('rut ro scoob',response);
    })

}    
