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
let word = "magnolia";
//Guessed letters
let guessedLetters = [];
//Guesses remaining
let remainingGuesses = 8;

//Calling a random word API
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text(); 
    // console.log(words);
    const wordsArray = words.split("\n");
    // console.log(wordsArray);
    //Grabbing a random word from the array just created
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    word = wordsArray[randomIndex].trim();
    // console.log(word);
    placeholder(word);
};

getWord();

//Creates the placeholders for the word to be guessed
const placeholder = function(word) {
    const wordArray = word.split("");
    const returnArray = [];
    wordArray.forEach(function (letter) {
        returnArray.push("●")
    });
    wordProgress.innerText = returnArray.join("");
};


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
        updateGuessList();
        guessesRemaining(letter);
        updateProgress(guessedLetters);
    }
    // console.log(guessedLetters)
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

//Displays the guesses remaining
const guessesRemaining = function (guess) {
    const compareWord = word.toUpperCase();
    //Finding out if the guess is in the word
    if (compareWord.includes(guess)) {
        message.innerText = "That letter is correct!";
    } else {
        message.innerText = "That letter is incorrect";
        remainingGuesses -= 1;

    }
    //Finding out how many guesses are left
    if (remainingGuesses === 0) {
        message.innerHTML = `Oh no! You lost! The word you were looking for was <span class="highlight">${word.toUpperCase()}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesNum.innerText = "1 guess";
    } else {
        remainingGuessesNum.innerText = `${remainingGuesses} guesses`;
    }
    // console.log(remainingGuesses);
};

//Check for win condition
const winCondition =  function () {
    if (wordProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You won! Congrats! 🥳</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesText.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText= "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    remainingGuessesNum.innerText = `${remainingGuesses} guesses`
    guessedLetters = [];
    guessButton.classList.remove("hide");
    remainingGuessesText.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});
