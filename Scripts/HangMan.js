/**
 * Created by Salma Essam  on 23/06/2024.
 */
const hangManIage =document.querySelector('.hangManBox img');
const keyboardDiv =document.querySelector('.keyboard');
const wordDisplay =document.querySelector('.wordDisplay');
const guessesText =document.querySelector('.guessesText b');
const hangManModal =document.querySelector('.hangManModal');
const playAgainbtn =document.querySelector('.playAgain');

let currentWord, correctWords =[], wrongWord =0;
const maxGuesses = 6;

// reset Game
const resetGame =()=>{
    correctWords =[];
    wrongWord =0;
    hangManIage.src='Images/hangman-' + wrongWord + '.svg'
    guessesText.innerText= wrongWord + ' / ' + maxGuesses;
    keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled=false)
    wordDisplay.innerHTML = currentWord.split("").map(()=>('<li class="letter"></li>')).join("")
    hangManModal.classList.remove('show')

};

// select word and hint from wordList
const onRandomWord =()=>{
const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
currentWord = word
document.querySelector('.hintText').innerText = hint;
wordDisplay.innerHTML = word.split("").map(()=>('<li class="letter"></li>')).join("")
resetGame();
}
// Ganme Over result
const GameOver=(isVictory)=>{
    setTimeout(()=>{
        const modalText = isVictory ? 'You Found The Word :':'The Correct Word Was :';
        hangManModal.querySelector('img').src= `Images/${isVictory ?"Victory" :'lost'}.gif`;
        hangManModal.querySelector('h4').innerText=`${isVictory ?"Congrats!" :'Game Over!'}`;
        hangManModal.querySelector('p').innerHTML= `${modalText} <b>${currentWord}</b>`;
        hangManModal.classList.add('show')
    },300)
}
// display litters , disabled btns guessesresult
const initGame = (button, clickedLetter) =>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctWords.push(letter)
                wordDisplay.querySelectorAll('li')[index].innerText=letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed')
            }
        })
    } else {
        wrongWord++;
        hangManIage.src='Images/hangman-' + wrongWord + '.svg'
    }
     button.disabled = true;
     guessesText.innerText= wrongWord + ' / ' + maxGuesses;
     if(wrongWord === maxGuesses) return GameOver(false)
     if(correctWords.length === currentWord.length) return GameOver(true)
    };

// create keyboard buttons dynamicly and addlistner to button
for(let i=97; i<=122 ; i++){
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)))
}
// add event to playagain btn to reset the Game and Play Again
playAgainbtn.addEventListener('click', onRandomWord);

onRandomWord()