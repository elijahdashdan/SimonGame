var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = 0;
var level = 0;

$(document).keypress(function(event) {
  console.log(event.key);
  if (event.key === "s") {
    if (startGame == 0) {
      startGame = 1;
      level = 0;
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  }
});

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateButton(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var ranDom = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[ranDom];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
}

function playSound(soundName) {
  var audio = new Audio('sounds/' + soundName + '.mp3');
  audio.play();
}


function animateButton(color) {
  var selectButton = $("#" + color);
  selectButton.addClass("pressed");
  setTimeout(function() {
    selectButton.removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  startGame = 0;
}
