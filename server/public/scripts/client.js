$(document).ready(onReady);

function onReady() {
    console.log('jquery is loaded');
    operatorSelection();
    // $('#addition-button').on('click', operatorSelection);
    // $('#addition-button').on('click', operatorSelection);
    // $('#addition-button').on('click', operatorSelection);
    // $('#addition-button').on('click', operatorSelection);
}

function operatorSelection() {
    let operator; 
    if($('#addition-button').on('click')){
        operator = 'addition'
    }
}