//Unordered list where guessed letters go
const guessedLettersElement = document.querySelector(".guessed-letters");
//Guess button
const guessButton = document.querySelector(".guess");
//Text input box
const letterInput = document.querySelector(".letter");
//Word progress paragraph
const wordProgress = document.querySelector(".word-in-progress");
//Remaining guesses paragraph
const remainingGuessesText = document.querySelector(".remaining");
//Span inside remaining guesses paragraph
const  remainingGuessesNum = document.querySelector(".remaining span");
//Messages paragraph
const message = document.querySelector(".message");
//Play again button
const playAgainButton = document.querySelector(".play-again");
//Word to be guessed
const word = "magnolia";
//Guessed letters
const guessedLetters = [];

//Creates the placeholders for the word to be guessed
const placeholder = function(word) {
    const wordArray = word.split("");
    const returnArray = [];
    wordArray.forEach(function (letter) {
        returnArray.push("●")
    });
    wordProgress.innerText = returnArray.join("");
};

placeholder(word);

//Button click event listener
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //clear the message paragraph
    message.innerText = "";
    //capture the input value
    const letterGuess = letterInput.value;
    //Validate the input
    const isValid = validateInput(letterGuess);
    if (isValid) {
        makeGuess(letterGuess);
    };
    //Clear the text box
    letterInput.value="";
});

//Make sure its a valid guess
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        //Is the input empty?
        message.innerText = "You didn't guess anything!";
    } else if (input.length > 1) {
        //Is there more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        //Is the input a letter?
        message.innerText = "You need to guess a letter from A to Z!";
    } else {
        //The input is a letter!
        return input;
    }
};

//A guess is made
const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter! Try again!";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters)
        updateGuessList();
        updateProgress(guessedLetters);
    }
    console.log(guessedLetters)
}

// Show each guessed letter 
const updateGuessList = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};

//Update the word progress with correctly guessed letters
const updateProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray)
    const updateArray = [];
    for (const letter of wordArray)
    if (guessedLetters.includes(letter)) {
        updateArray.push(letter);
    } else {
        updateArray.push("●")
    };
    wordProgress.innerText = updateArray.join("");
    winCondition();
};

//Check for win condition
const winCondition =  function () {
    if (wordProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the word correctly! Congrats!</p>`;
    }
};