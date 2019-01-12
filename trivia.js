$( document ).ready(function() {

	var game = {
		questions: [
		{
	   		question: 'Buckingham Palace is in London. In what country is London?',
	   		possibles: ['Denmark', 'Glasgow', 'England', 'Dublin'],
	   		id: 'question-one',
	   		answer: 2
		}, {
			question: 'The Eiffel Tower is in Paris. In which country is Paris?',
			possibles: ['England', 'Italy', 'Germany', 'France'],
			id: 'question-two',
			answer: 3
		}, {
			question: 'What is the capital of California?',
			possibles: ['San Francisco', 'Los Angeles', 'Mendocino', 'San Diego', 'Sacramento'],
			id: 'question-three',
			answer: 4
		}, {
			question: 'The White House is in Washington, DC. In which country is it?',
			possibles: ['Canada', 'France', 'Australia', 'USA', 'Mexico'],
			id: 'question-four',
			answer: 3
		}, {
			question: 'What is the capital of Alabama?',
			possibles: ['Montgomery', 'Birmingham', 'Mobile', 'Tuscaloosa', 'Gulf Shores'],
			id: 'question-five',
			answer: 0
		}, {
			question: 'What is the capital of Colorado?',
			possibles: ['Boulder', 'Denver', 'Vale', 'Fort Collins', 'Grand Junction'],
			id: 'question-six',
			answer: 1

		}, {
			question: 'What is the capital of Delaware?',
			possibles: ['Wilmington', 'Newark', 'Dover', 'Lewes', 'Middletown'],
			id: 'question-seven',
			answer: 2
		}, {
			question: 'What is the capital of Florida?',
			possibles: ['Miami', 'Tampa', 'Jacksonville', 'Daytona Beach', 'Talahassee'],
			id: 'question-eight',
			answer: 4
		}, {
			question: 'What is the capital of Idaho?',
			possibles: ['Coeur dAlene', 'Idaho Falls', 'Boise', 'Meridian', 'Twin Falls'],
			id: 'question-nine',
			answer: 2
		}, {
			question: 'What is the capital of Michigan?',
			possibles: ['Macinack Island', 'Lansing', 'Grand Rapids', 'Ann Arbor', 'Flint'],
			id: 'question-ten',
			answer: 1
		}, {
			question: 'What is the capital of Washington State?',
			possibles: ['Seattle', 'Bellevue', 'Spokane', 'Olympia', 'Bellingham'],
			id: 'question-eleven',
			answer: 3
		}, {
			question: 'The Sydney Opera House is found in the largest city in which country?',
			possibles: ['Canada', 'Brazil', 'Japan', 'USA', 'Australia'],
			id: 'question-twelve',
			answer: 4
		}
		]}

	
	var message = 'Game Over!';
	
 
    $(".startGame").on("click", function (){

		$('.wrapper').show();
		console.log('hello');

		$(this).hide();
	});

    // timer
    var number = 30;
    $('#timeLeft').on('click', run);

	
    function decrement(){
        // -1
        number--;
       
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
        
        if (number === 0){
        
        stop();
       
        $('#message').html('time up!');
        checkAnswers();
        }
    }
   
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    // stop function
    function stop(){
   
        clearInterval(counter);
    }

    
    run();


function formTemplate(data) {

	var qString = "<form id='questionOne'>"+ data.question +"<br>";

	var possibles = data.possibles;

	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;


function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}

function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}


buildQuestions();


function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}


function checkAnswers (){


	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0


	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {

			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}

	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}


function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');

	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}

	return anyAnswered;

}


	$('#doneButton').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});