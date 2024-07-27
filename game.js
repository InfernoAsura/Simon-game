var buttonNames = ["green", "red", "yellow", "purple"];
var gamePattern = []
var userClickedPattern = []

var ranNum;
var getChosenColor;
var gameStart = false;
var level = 0;

$(document).keypress(function(event){
    if(gameStart === false){
        nextSequence();
        gameStart = true;
    }
})

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    ranNum = Math.random();
    ranNum = Math.floor(ranNum * 4);
    getChosenColor = buttonNames[ranNum];
    gamePattern.push(getChosenColor);
    $("#" + getChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var aud = new Audio("sounds/"+getChosenColor+".mp3");
    aud.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(index){
    if(userClickedPattern[index] === gamePattern[index]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStart = false;
    gamePattern = [];
    level = 0;
}

function playSound(btnClick){
    var aud = new Audio("sounds/"+btnClick+".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

