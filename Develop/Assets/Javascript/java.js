// This sections gets all elements needed in the code from the HTML file
var firstViewPage = $("#first-view");
var firstQuestion = $("#first-question");
var secondQuestion = $("#second-question");
var thirdQuestion = $("#third-question");
var fourthQuestion = $("#fourth-question");
var fifthQuestion = $("#fifth-question");
var gameOverMenu = $("#game-over");
var HighScoresPage = $("#high-scores");
var divCheck = $(".hidden-check");
var checkCorrectAnswerText = $(".check-correct-answer");
var checkWrongAnswerText = $(".check-wrong-answer");

// This section hides all the elements
function hideall() {
  firstQuestion.hide();
  secondQuestion.hide();
  thirdQuestion.hide();
  fourthQuestion.hide();
  fifthQuestion.hide();
  divCheck.hide();
  gameOverMenu.hide();
  checkCorrectAnswerText.hide();
  checkWrongAnswerText.hide();
  HighScoresPage.hide();
  firstViewPage.hide();
}

hideall();
firstViewPage.show();

// Here are all the counters
var correctAnswer = 0;
var timeleft;
var timerCount;

$("#start").click(function starttimer() {
  timeleft = 75;
  // timer section
  timerCount = setInterval(function () {
    // Changes the number in the HTML
    document.getElementById("timer-count").innerHTML = timeleft;
    //    Makes sure timer won't go to negative numbers
    if (timeleft <= 0) {
      // Sets the game over
      clearInterval(timerCount);
      timeleft = 0;
      hideall();
      gameOverMenu.show();
      $(".final-score").html(correctAnswer + "/5");
    } else {
      // Decrements seconds left
      timeleft--;
    }
  }, 1000);
  $(".timer-section").show();
});

// This runs the next page and hides the current one
$(".next").click(function () {
  $(this).parents("section").hide();
  $(this).parents("section").next("section").show();
  $(".timer-section").show();
});

// This is only for the last page before the final score page
$(".last-one").click(function () {
  $(this).parents("section").hide();
  $(this).parents("section").next("section").show();
  $(".timer-section").show();
  // This sets the time left to 0
  timeleft = 0;
});

// This displays the correct answer text and increases the corrects counter
$(".correct-answer").click(function () {
  correctAnswer++;
  checkWrongAnswerText.hide();
  checkCorrectAnswerText.show();
  divCheck.show();
});

// This displays the wrong answer text and dicreases the timer
$(".wrong-answer").click(function () {
  checkCorrectAnswerText.hide();
  checkWrongAnswerText.show();
  divCheck.show();
  if (timeleft <= 0) {
    timeleft = 0;
    $(this).parents("section").hide();
    gameOverMenu.show();
  } else {
    timeleft -= 10;
  }
});

var arrayForHighScores = [];
// LOCAL STORAGE PART
$(".submit-button").click(function () {
  // Gets the initials value from the input
  var inputInitialsValue = $(".input-initials").val();
  // Stores in a variable the final score
  var calificacion = correctAnswer + "/5";
  console.log(correctAnswer);
  correctAnswer = 0;
  console.log(correctAnswer);
  //  Stores in a variable the initials, plus the final score
  var finalScoreAndName =
    inputInitialsValue.toUpperCase() + "   -----   " + calificacion;
  //  Pushes the initials with the score to an empty array in order to save it in the local storage
  arrayForHighScores.push(finalScoreAndName);
  // Sets the key word and the value as a string in the local storage
  localStorage.setItem("high score", JSON.stringify(arrayForHighScores));
  // logs the content in the local storage
  var getItemFromLocalStorage = localStorage.getItem("high score");
  console.log("high Score: ", JSON.parse(getItemFromLocalStorage));
  // appends the new score to the "High scores " list
  $("#ol-for-score").append(
    "<li>" + arrayForHighScores[arrayForHighScores.length - 1] + "</li>"
  );
  HighScoresPage.show();
  gameOverMenu.hide();
  $(".timer-section").hide();
  // CLEAR THE INPUt
  $(".input-initials").val("");
  $(".view-highscores").hide();
});

// Reset button
$(".reset-btn").click(function () {
  // Resets the table of high scores
  $("#ol-for-score").empty();
  arrayForHighScores.length = 0;
  // Clears the local Storage
  localStorage.clear();

  correctAnswer = 0;
  clearInterval(timerCount);
  $(".timer-section").hide();
  $(".view-highscores").hide();
});

// Back button part
$(".back-btn").click(function () {
  // Shows the main page
  hideall();
  firstViewPage.show();
  $(".timer-section").show();
  clearInterval(timerCount);
  $(".timer-section").hide();
  $(".view-highscores").show();
});

// View high scores section
$("#view-btn").click(function () {
  hideall();
  $(".timer-section").hide();
  $(".view-highscores").hide();
  HighScoresPage.show();
  // Clears the timer
  clearInterval(timerCount);
});
