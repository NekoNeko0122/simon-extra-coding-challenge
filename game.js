var level = 0;
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
timeOutIds = [];

buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function(){

    var userChosenColor = this.id;
    flashClick(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    setTimeout(function(){
        $("#" + userChosenColor).removeClass("pressed")}, 10
    );
    if ($("h1").text() === "Press the Button or Any Key to Start" || $("h1").text() === "Game Over, Press the Button or Any Key to Start") {
        wrongAnswer();
        console.log("nmaeeeds");
    }
    if (userClickedPattern.length > 0) {
        checkAnswer(level);
        console.log("check answer");
    }
})



// if ($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key to Start") {
//     $(document).on("keypress", function(){
//         nextSequence();
//         console.log("keypressed");
//     })
// } 

$(document).on("keypress", function() {
    if (!gameStarted) {
        timerStart();
    }
})

$(".startBtn").on("click", function(){
    if (!gameStarted) {
        
        timerStart();
    }
})

function nextSequence() {
    level++;
    var randomNumber = Math.floor((Math.random())*4);
    $("h1").text("Level " + level);

    var newColor = buttonColors[randomNumber];
    playSound(newColor);
    flashClick(newColor);
    gamePattern.push(newColor);

    console.log("next sequence called");

}

function checkAnswer(level) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]){
        console.log("korek");
        
        if (userClickedPattern.length === level) {
            userClickedPattern = [];
            clearTimeouts();

            var timeOutId = setTimeout(function(){
                nextSequence();
            }, 1000);
            timeOutIds.push(timeOutId);
        }

    } else {
        wrongAnswer();
    }
  
}

function wrongAnswer() {
    playSound("wrong");
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    gameStarted = false;
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 80)
    $("h1").text("Game Over, Press the Button or Any Key to Start");

    clearTimeouts();
}

function flashClick(currentColor) {
    $("#" + currentColor).fadeOut(50).fadeIn(50);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
}

function playSound(soundId){
    new Audio("sounds/" + soundId + ".mp3").play();
}


function timerStart() {
    gameStarted = true;
    $("h1").text("Ready");
    timeOutIds.push(setTimeout(function(){
        $("h1").text("3");
    }, 1000));
    timeOutIds.push(setTimeout(function(){
        $("h1").text("2");
    }, 2000));
    timeOutIds.push(setTimeout(function(){
        $("h1").text("1");
    }, 3000));
    timeOutIds.push(setTimeout(function(){
        nextSequence();
    }, 4000));
}

function clearTimeouts() {
   
    for (var i = 0; i < timeOutIds.length; i++) {
        clearTimeout(timeOutIds[i]);
    }
  
    timeOutIds = [];
}