const words = [
    "account", "act", "addition", "adjustment", "advertisement", "agreement", "air", "amount", "amusement", "animal", "answer", "apparatus", "approval", "argument", "art", "attack", "attempt", "attention", "attraction", "authority",
    "back", "balance", "base", "behaviour", "belief", "birth", "bit", "bite", "blood", "blow", "body", "brass", "bread", "breath", "brother", "building", "burn", "burst", "business", "butter",
    "canvas", "care", "cause", "chalk", "chance", "change", "cloth", "coal", "colour", "comfort", "committee", "company", "comparison", "competition", "condition", "connection", "control", "cook", "copper", "copy", "cork", "cotton", "cough", "country", "cover", "crack", "credit", "crime", "crush", "cry", "current", "curve",
    "damage", "danger", "daughter", "day", "death", "debt", "decision", "degree", "design", "desire", "destruction", "detail", "development", "digestion", "direction", "discovery", "discussion", "disease", "disgust", "distance", "distribution", "division", "doubt", "drink", "driving", "dust",
    "earth", "edge", "education", "effect", "end", "error", "example", "exchange", "existence", "expansion", "experience", "expert",
    "fact", "fall", "family", "father", "fear", "feeling", "fiction", "field", "fight", "fire", "flame", "flight", "flower", "fold", "food", "force", "form", "friend", "front", "fruit",
    "game", "garden", "gate", "general", "gentleman", "gift", "give", "glad", "glass", "goat", "god", "gold", "good", "goodbye", "grandfather", "grandmother", "grass", "grave", "great", "green", "gray", "ground", "group", "grow", "gun",
    "hair", "half", "hall", "hammer", "hand", "happy", "hard", "hat", "hate", "head", "healthy", "hear", "heavy", "heart", "heaven", "height", "hello", "help", "hen", "hide", "high", "hill", "hit", "hobby", "hold", "hole", "holiday", "home", "hope", "horse", "hospital", "hot", "hotel", "house", "hundred", "hungry", "hour", "hurry", "husband", "hurt",


];

let presentWord = words[Math.floor(Math.random() * words.length)].toUpperCase().split('');
let guessedWord = presentWord.map(el => "");
let wrongWordsCount = 0;

let definitions, synonyms;
window.addEventListener('load', () => {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(el =>
        `<button class="key-btn" id="${el}">${el}</button>`).join('');

    document.querySelector('.keyboard').innerHTML = letter;

    // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${presentWord.join('')}`
    // ).then(response=>{
    //     response.json().then(data=>{
    //         console.log(data);
    //     });
    // });
    
});


document.querySelector('.hint-btn').addEventListener('click', () => {
    document.querySelector('.modal-bg').style.display = 'flex';
});
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal-bg').style.display = 'none';
});

// const string="hair, half, hall, hammer, hand, happen, happy, hard, hat, hate, have, he, head, healthy, hear, heavy, heart, heaven, height, hello, help, hen, her, here, hers, hide, high, hill, him, his, hit, hobby, hold, hole, holiday, home, hope, horse, hospital, hot, hotel, house, how, hundred, hungry, hour, hurry, husband, hurt";
// const func=string=>{
//     const convert=string.split(', ').map(el=>el);
//     console.log(convert);
// };

// func(string);

const loadGuessedWordMarkup = letter => {
    const markup = `<div class="word">${letter}</div>`;
    return markup;
};

const loadGuessedWord = word => {
    const underline = word.map(el => loadGuessedWordMarkup(el)).join('');
    document.querySelector('.guess-word').innerHTML = underline;
};

const displayWrongWordCount = () => {
    if (wrongWordsCount <= 6)
        document.getElementById('guess').textContent = 6 - wrongWordsCount;
};

const removeKeyBoard = () => document.querySelector('.keyboard').innerHTML = "";

const renderResetButton = type => {
    const markup = `<button class="reset-btn" onClick=refreshPage()>NEW GAME</button>`;
    document.querySelector('.keyboard').insertAdjacentHTML('afterend', markup);
};

const refreshPage = () => window.location.reload();

const renderResultMarkup = type => {
    const result = type === 'correct' ? "Well Done!!" : "You Lost!!"
    const markup = `<h2 class="${type}-result">${result}</h2>`;
    document.querySelector('.guess-word').insertAdjacentHTML('afterend', markup);
};

const checkIfCorrect = () => {
    console.log(presentWord);
    console.log(guessedWord);
    if (guessedWord.join('') === presentWord.join('')) {
        renderResetButton();
        removeKeyBoard();
        renderResultMarkup('correct');
    }

};


const checkLetterPresent = letter => {
    const isPresent = presentWord.includes(letter);
    if (isPresent) {
        presentWord.forEach((el, id) => {
            if (el === letter) {
                guessedWord[id] = letter;
                loadGuessedWord(guessedWord);
            }
        });
    }
    else {
        wrongWordsCount++;
        displayWrongWordCount();
        if (wrongWordsCount < 6)
            document.getElementById('step-image').src = `./images/${wrongWordsCount}.jpg`;
        else if (wrongWordsCount === 6) {
            document.getElementById('step-image').src = `./images/${wrongWordsCount}.jpg`;
            loadGuessedWord(presentWord);
            renderResultMarkup('wrong');
            removeKeyBoard();
            renderResetButton();
        }

    }



};


document.querySelector('.keyboard').addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.key-btn')) {
        document.getElementById(target.id).disabled = true;
        document.getElementById(target.id).classList.add('disable');
        checkLetterPresent(target.id);
        checkIfCorrect();

    }

});
loadGuessedWord(guessedWord);