    // GLOBAL VARIABLES
// -------------------------------------------------------------------
// Arrays and Variable for holding data
var wordToGuess = ["christian", "lori", "cindy", "ritchie", "ohio","bijan", "missy"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];// j _ _ _ _ _ _ _
//var wrongLetters = [];
var wrongLetters = new Array();

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS (Reusable blocks of code that I will call upon when needed)
// -------------------------------------------------------------------

function startGame() {
    selectedWord = wordToGuess[Math.floor(Math.random() * wordToGuess.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and sucesses with right number of blanks.
    for (var i=0; i<numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing and Debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    // Check if letter exists in code at all
    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }
    // Check where in word letter exists, then populate out blankAndSuccesses array.
    if(isLetterInWord) {
        for (var i=0; i<numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    // Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing and Debugging
    console.log(blanksAndSuccesses);

}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

    //Update the HTML to reflect the most recent count stats
//    document.getElementById("numGuesses").innerHTML = guessesLeft;
    $("#numGuesses").text(guessesLeft);
//    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    $("#wordToGuess").text(blanksAndSuccesses.join(" "));
//    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    if(wrongLetters.length > 0) {
        $("#wrongGuesses").text(wrongLetters.join(" "));
    } else {
        $("#wrongGuesses").text("");
    }

    // Check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!");

        // Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}

// MAIN PROCESS
// -------------------------------------------------------------------

// Intiates the code the first time
startGame();

//Register keyclicks

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // Testing and Debugging
    console.log(letterGuessed);
}