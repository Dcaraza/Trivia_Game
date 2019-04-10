var panel = $("#quiz-area");

// Questions are a variable array. Inside each one is an objecy with a question, each question has multiple answers in an array.
// The 3 objects, question, answers, and correctAnswers are all objects inside the questions variable.
var questions = [{
  question: "What was the most expensive car sold at an auction?",
    choice: ["Ferrari 250 GTO", "Ferrari 335S.", "Mercedes-Benz W196", "Ferrari 290 MM"],
      answer: 1,
}, 
{
  question: "What is the fastest production car?",
    answers: ["Koenigsegg Agera RS", "Hennessy Venom F5", "Hennessy Venom GT", "Bugatti Chiron"],
      correctAnswer: "Hennessy Venom F5"
}, 
{
  question: "Who started the Lamborghini company?",
    answers: ["Fettuccine Alfredo", "Walter Mercado", "Ferruccio Lamborghini", "Battista Pinin Farina"],
      correctAnswer: "Ferruccio Lamborghini"
}, 
{
  question: "What was the first model year of the Corvette?",
    answers: ["1903", "1963", "1953", "1933"],
      correctAnswer: "1953"
}, 
{
  question: "What was the only model year the Corvette was not produced?",
    answers: ["1973", "2003", "1223", "1983"],
      correctAnswer: "1983"
}, 
{
  question: "Where was the original production plant of the Corvette?",
    answers: ["Flint, Michigan", "Hialeah, Florida", "Little Havana", "Detroit, Michigan"],
      correctAnswer: "Flint, Michigan"
}, 
{
  question: "What car inspired the Corvette design?",
    answers: ["Kia Sportage", "Jaguar XK120", "Ferrari 250 GTO", "El transportation"],
      correctAnswer: "Jaguar XK120"
}, 
{
  question: "Which one of these is not a Corvette Model?",
    answers: ["ZR-1", "ZO6", "Stingray", "Sugar Ray"],
      correctAnswer: "Sugar Ray"
}];

// Variable that will hold the setInterval
var timer;

var game = {

  correct: 0,
  incorrect: 0,
  counter: 120,

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      panel.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append("<input type='radio' name='question-" + i +
        "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    panel.append("<button id='done'>Done</button>");
  },

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  

  done: function() {

    $.each($("input[name='question-0']:checked"), function() {
      if ($(this).val() === questions[0].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-1']:checked"), function() {
      if ($(this).val() === questions[1].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-2']:checked"), function() {
      if ($(this).val() === questions[2].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-3']:checked"), function() {
      if ($(this).val() === questions[3].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-4']:checked"), function() {
      if ($(this).val() === questions[4].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-5']:checked"), function() {
      if ($(this).val() === questions[5].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-6']:checked"), function() {
      if ($(this).val() === questions[6].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-7']:checked"), function() {
      if ($(this).val() === questions[7].correctAnswer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });

    this.result();

  },

  result: function() {

    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    panel.html("<h2>All Done!</h2>");
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

// CLICK EVENTS
// When you click in the document on the start ID, it will call the game.start function. This is why functions
// that are objects have the name of the function first and then the name object.
$(document).on("click", "#start", function() {
  game.start();
});


$(document).on("click", "#done", function() {
  game.done();
});