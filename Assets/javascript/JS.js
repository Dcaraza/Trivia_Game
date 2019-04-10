$(document).ready(function () {
var options = [{
      question: "What was the most expensive car sold at an auction?",
        choice: ["Ferrari 250 GTO", "Ferrari 335S.", "Mercedes-Benz W196", "Ferrari 290 MM"],
          answer: 0,
            photo:  "assets/images/Ferrari_250_GTO.jpg"
    }, 
    {
      question: "What is the fastest production car?",
        choice: ["Koenigsegg Agera RS", "Hennessy Venom F5", "Hennessy Venom GT", "Bugatti Chiron"],
          answer: 1,
           photo:  "assets/images/Hennessey_Venom_F5.jpg"
    }, 
    {
      question: "Who started the Lamborghini company?",
        choice: ["Fettuccine Alfredo", "Walter Mercado", "Ferruccio Lamborghini", "Battista Pinin Farina"],
           answer: 2,
            photo:  "assets/images/ferruccio.jpg"
    }, 
    {
      question: "What was the first model year of the Corvette?",
        choice: ["1903", "1963", "1953", "1933"],
           answer: 2,
            photo:  "assets/images/1953_Corvette.jpg"
    }, 
    {
      question: "What was the only model year the Corvette was not produced?",
        choice: ["1973", "2003", "1223", "1983"],
           answer: 3,
             photo:  "assets/images/1983_Corvette.jpg"
    }, 
    {
      question: "Where was the original production plant of the Corvette?",
        choice: ["Flint, Michigan", "Hialeah, Florida", "Little Havana", "Detroit, Michigan"],
           answer: 0,
            photo:  "assets/images/Flint_Corvette.jpg"
    }, 
    {
      question: "What car inspired the Corvette design?",
        choice: ["Kia Sportage", "Jaguar XK120", "Ferrari 250 GTO", "El transportation"],
           answer: 1,
             photo:  "assets/images/Jaguar_Corvette.jpg"
    }, 
    {
      question: "Which one of these is not a Corvette Model?",
        choice: ["ZR-1", "ZO6", "Stingray", "Sugar Ray"],
           answer: 3,
             photo:  "assets/images/Corvette1.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 5;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide('slow');



//click start button to start game
$("#start").on("click", function () {
        // .hide removes the element selected from site. Wont be able to see it anymore. The slow argument makes the 
        // button fly off the screen.
		$("#start").hide('slow');
		displayQuestion();
        runTimer();
        // This for loop will be used to hold the questions.
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
    })
    

//timer start
function runTimer(){
    // Make sure the timer is not running.
	if (running === false) {
    // setInterval is a javascript timer. It calls a function after a given amount of time. In this case, 1 second.
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}



//This function is called by the runTimer function. It counts down the time left to answer the question.
function decrement() {
    // The time left id has its html changed to show time remining. Then the timer variable is reduced by one.
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

    //if you run out of time, the unanswered questions variable increases by one. The stop function also runs.
    // The correct answer is then displayed.
	if (timer === -1) {
		unanswerCount++;
        stop();
        // This code will show you the correct answer.
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}





//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}

function displayQuestion() {
  // This will pick the first object in the options variable and set the pick variable equal to it. 
	pick = options[0];
	  //This will add the question to the Id.
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
       
        // the for loop will add the choices to the screen.
		for(var i = 0; i < pick.choice.length; i++) {
            // This will create a new div element for the answers. There are 4 possible answers.
            var userChoice = $("<div>");
            // This will add a class to the div you are creating called answerchoice. This will allow you to add
            // styling to it in css.
            userChoice.addClass("answerchoice");
            // This will take the current div and add the current choice that is being cycled through.
			userChoice.html(pick.choice[i]);
            //This turns the guess value into a number. Each option will have a 0-3. This will let you know if the answer
            // is right.
            userChoice.attr("data-guessvalue", i);
            // This adds the variable to the id.
			$("#answerblock").append(userChoice);
        }



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
    //parseInt takes a string and turns it into an interger. it only looks at a specific part of the argument so this
    // can be tricky.
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
        correctCount++;
        // clear out user guess variable
        userGuess="";
        
		$("#answerblock").html("<h2>Correct!</h2>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<h2>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</h2>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 5;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide('slow');
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})