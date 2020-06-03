// .......................................................................//
//          ______                 _         ___                          //
//          | ___ \               ( )       |_  |                         //
//          | |_/ /___  _ __ _   _|/ ___      | | __ ___   ____ _         //
//          |    // _ \| '__| | | | / __|     | |/ _` \ \ / / _` |        //
//          | |\ \ (_) | |  | |_| | \__ \ /\__/ / (_| |\ V / (_| |        //
//          \_| \_\___/|_|   \__, | |___/ \____/ \__,_| \_/ \__,_|        //
//                            __/ |                                       //
//                           |___/                                        //
// .......................................................................//

var homeState = $("#home");
var aboutState = false;
var contactState = false;

    
function setUpLogin()
{
        $("#login").on("click", function(event){
        alert("Login clicked");
        event.stopPropagation();
    });
}

function setUpRegister()
{
        $("#signup").on("click", function(event){
        alert("Signup clicked");
        event.stopPropagation();
    });
}

// For home, about an contact I need to set the "active" state to off when one of the others is pressed.

function setupHome()
{
    $("#home").on("click", function(event){
        this.classList.toggle("active")
        event.stopPropagation();
    });
}

function setupAbout()
{
    $("#about").on("click", function(event){
        this.classList.toggle("active")
        event.stopPropagation();
    });
}

function setupContact()
{
    $("#contact").on("click", function(event){
        this.classList.toggle("active")
        event.stopPropagation();
    });
}

function setupListeners()
{
    setUpLogin();
    setUpRegister();
    setupContact();
    setupAbout();
    setupHome();
}

// Main code initialisation

setupListeners();
