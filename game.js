
var buttonColours = ["red", "blue", "green", "yellow"];

// var listOfWords = ["salom", "hayir", "kal", "bosh", "quyosh", "suv", "kosa", "piyola", "non", "qozon", "bulut", "qor", "bahor", "mushuk"];
// var randomWordIndex = listOfWords[Math.floor(Math.random() * listOfWords.length)];
// alert('The computer chose: ' + randomWordIndex);

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$("#rstbtn").click(function () {
    var restartbtn = $(this).attr("id");
    animatePress(restartbtn);
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

$('#strtbtn').click(function () {
    var startbtn = $(this).attr("id");
    animatePress(startbtn);
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        $("#level-title").text("Game Over,Press Restart button to Restart");
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

   
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

} function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}