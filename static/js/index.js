"use strict"
var side_bar_active = false;
var announces_display = false;

$(document).ready(function() {
    var pageId = window.location.pathname.replace("/", "");    
    if(pageId) {
        !$("#"+pageId).hasClass("button-clicked") ? $("#"+pageId).addClass("button-clicked") : "";
    };
    $(".side-button").on("click", function() {
        checkOtherButtons();
        updatePage($(this).get(0).id);
    });
    $("#button-hamburger").on("click", function() {
        if(side_bar_active) {
            $("#side-bar").css("transform", "translateX(-100%)");
            $("#button-hamburger").css("color", "var(--color4)");
            side_bar_active = false;
        } else {
            $("#side-bar").css("transform", "translateX(0%)");
            $("#button-hamburger").css("color", "var(--color2)");
            side_bar_active = true;
        }
    });
    $("#logout-button").on("click", function() {
        $.ajax({
            url: "/login/getLogged",
            type: "GET",
            success: function(res) {
                if(res.logged){
                   location.href = "/login/logout"
                } else {

                }
            }
        });
    });
    $("#announce-new").on("click", function() {
        $("#modal-announce").fadeIn(500);
    });
    $("#close-modal").on("click", function() {
        $("#modal-announce").fadeOut(500);
        $("#announce-text").val("");
    });
    $("#submit-announce").on("click", function() {
        var announceText = $("#announce-text").val();
        console.log(announceText)
        $.ajax({
            url: "api/announce/new",
            type: "POST",
            data: { announceText: announceText },
            success: function(res) {
                console.log('Anuncio postado.');
            }
        });
    });
    if(pageId == "") {
        getAnnounces();
    }
});

$(window).on("resize", function() {
    if ($(this).width() < 1080) {
        $("#side-bar").css({"z-index":"98", "transform": "translateX(-100%)"});
        $("#button-hamburger").css({"z-index": "99","transition":"all .1s","display": "flex"});
        $("#main-menu").css({"margin-left": "0px"});
    } else {
        $("#side-bar").css({"z-index":"98", "transform": "translateX(0%)"});
        $("#button-hamburger").css({"display": "none"});
        $("#main-menu").css({"margin-left": "250px"});
    }
});

function buttonClicked() {
    !$(this).hasClass("button-clicked") ? $(this).addClass("button-clicked") : "";
};
function checkOtherButtons() {
    const buttonclicked = document.querySelectorAll(".button-clicked");
    if(!buttonclicked[0]) return;
    buttonclicked[0].classList.remove("button-clicked");
};
function updatePage(pageId) {
    location.href = "/"+pageId;
};
function getAnnounces() {
    $.ajax({
        url: "api/announce/get",
        type: "GET",
        success: function(res) {
            if(announces_display) return console.log("Already displaying.");

            var announces = res.announces;
            for(var i = 0; i < announces.length; i++){
                var announceList = document.querySelector("#announce-list");
                var newAnnounce = document.createElement("div");

                newAnnounce.classList.add("announce");
                newAnnounce.innerHTML = announces[i];
                announceList.appendChild(newAnnounce);
            };
            announces_display = true;
        }
    });
};