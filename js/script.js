//Unordered list where guessed letters go
const guessedLetters = document.querySelector(".guessed-letters");
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

//Updates the word progress paragraph
const updateProgress = function(word) {
    const wordArray = word.split("");
    const returnArray = [];
    wordArray.forEach(function (letter) {
        returnArray.push("●")
    });
    wordProgress.innerText = returnArray.join("");
};

updateProgress(word);

//Button click event listener
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const letterGuess = letterInput.value;
    console.log(letterGuess);
    letterInput.value="";
});