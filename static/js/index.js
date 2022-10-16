"use strict"

$(document).ready(function() {
    $('.side-button').on('click', function() {
        checkOtherButtons();
        !$(this).hasClass('button-clicked') ? $(this).addClass('button-clicked') : '';
        updatePage($(this).get(0).id);
    });

});

function checkOtherButtons() {
    const buttonclicked = document.querySelectorAll('.button-clicked');

    if(!buttonclicked[0]) return;
    buttonclicked[0].classList.remove('button-clicked');
};

function updatePage(pageId) {
    location.href = '/'+pageId;
}   


