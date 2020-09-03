let generatedNumber;
let input;
let guessedNum = [];
let count = 0;

const generateRandomNumber = () => {
    generatedNumber = Math.floor(Math.random() * 101);  
};

const getInput = () => {
    input = document.getElementById('number_guess').value;
};

function getDialog(situation) {
    let text = "<div class='measure_result'>";

    switch(situation) {
        case 'invalid' :
            text += "Please guess between 0 and 100";
            break;
        case 'high' :
            text += "Your guess is too high";
            break;
        case 'low' :
            text += "Your guess is too low";
            break;
        case 'close' :
            text += "Your guess is close";
            break;
        case 'won' :
            text += "Awesome you won!!!";
            break;            
    };

    text += '</div>';
    document.getElementById('measure_result').innerHTML = text;
};

function measureResult(randomNum, userInput) {
    if(userInput > 100 || userInput === '') {
        getDialog('invalid');
    } else if(randomNum > userInput) {
        if( (randomNum - userInput) <= 10 ) {
            getDialog('close');
        } else {
            getDialog('low');
        }
    } else if(randomNum < userInput) {
        if( (userInput - randomNum) <= 10 ) {
            getDialog('close');
        } else {
            getDialog('high');
        }
    } else {
        getDialog('won');
    }
};

function getHistory() { 
    guessedNum.unshift(input);
    let text = '<ul class="guess_history">';
        guessedNum.map(num => text += '<li> You guessed ' + num + ' </li>');
    text += '</ul>';
    document.getElementById('guess_history').innerHTML = text;  
};

function getHint() {
    let text = "<div class='measure_result'>";

    if(generatedNumber.toString().length === 1 || generatedNumber === 10) {
        text += 'Your guess should be between 1 and 10';
    } else if(generatedNumber.toString().length === 3) {
        text += 'Your guess should be between 91 and 100';
    }else {
        text += `Your guess should be between ${generatedNumber.toString()[0]}1 and ${Number(generatedNumber.toString()[0]) + 1}0`;
    };

    text += '</div>';
    document.getElementById('measure_result').innerHTML = text;
};

function classToggle() {
    const hint = document.querySelectorAll('#hint_btn');
    
    hint.forEach(hint => hint.classList.toggle('d-inline'));
};


const playGame = () => {
    count += 1; 
    getInput();
    if(input <= 100 && input > 0) {
        getHistory();
    };
    measureResult(generatedNumber, input);
    if(guessedNum.length > 2) {
        classToggle();
    };
    document.getElementById('number_guess').value = '';   
};

function resetGame() {
    count = 0;
    generateRandomNumber();
    guessedNum = [];
    document.getElementById('guess_history').innerHTML = null;
    document.getElementById('measure_result').innerHTML = null;
    document.getElementById('number_guess').value = '';
};

window.onload = () => {
    generateRandomNumber(); 
};

document.getElementById('submit_btn').addEventListener('click', playGame);
document.getElementById('reset_btn').addEventListener('click', resetGame);
document.getElementById('hint_btn').addEventListener('click', getHint);


