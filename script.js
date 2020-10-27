            /* Mock Data */
            /* Defining Stubs */
            /* Mocking the Implementation and Assertion */
            /*Mocking the Service */

"scripts": {
        "start": "nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' ./bin/www",
        "test": "nodemon ./node_modules/.bin/mocha \"./test/unit/src/api/**/**.spec.js\"",
        "coverage": "nyc --reporter=text-summary --reporter=html --reporter=lcov --reporter=text mocha \"./test/unit/src/**/**.spec.js\""
    },




//ts

"scripts": {
	"dev-coverage": "nyc npm run test"
}

const words = [
    "account", "act", "addition", "adjustment", "advertisement", "agreement", "air", "amount", "amusement", "animal", "answer", "apparatus", "approval", "argument", "art", "attack", "attempt", "attention", "attraction", "authority",
    "back", "balance", "base", "behaviour", "belief", "birth", "bit", "bite", "blood", "blow", "body", "brass", "bread", "breath", "brother", "building", "burn", "burst", "business", "butter",
    "canvas", "care", "cause", "chalk", "chance", "change", "cloth", "coal", "colour", "comfort", "committee", "company", "comparison", "competition", "condition", "connection", "control", "cook", "copper", "copy", "cork", "cotton", "cough", "country", "cover", "crack", "credit", "crime", "crush", "cry", "current", "curve",
    "damage", "danger", "daughter", "day", "death", "debt", "decision", "degree", "design", "desire", "destruction", "detail", "development", "digestion", "direction", "discovery", "discussion", "disease", "disgust", "distance", "distribution", "division", "doubt", "drink", "driving", "dust",
    "earth", "edge", "education", "effect", "end", "error", "example", "exchange", "existence", "expansion", "experience", "expert",
    "fact", "fall", "family", "father", "fear", "feeling", "fiction", "field", "fight", "fire", "flame", "flight", "flower", "fold", "food", "force", "form", "friend", "front", "fruit",
    "game", "garden", "gate", "general", "gentleman", "gift", "give", "glad", "glass", "goat", "god", "gold", "good", "goodbye", "grandfather", "grandmother", "grass", "grave", "great", "green", "gray", "ground", "group", "grow", "gun",
    "hair", "half", "hall", "hammer", "hand", "happy", "hard", "hat", "hate", "head", "healthy", "hear", "heavy", "heart", "heaven", "height", "hello", "help", "hen", "hide", "high", "hill", "hit", "hobby", "hold", "hole", "holiday", "home", "hope", "horse", "hospital", "hot", "hotel", "house", "hundred", "hungry", "hour", "hurry", "husband", "hurt",
    "sad", "safe", "sail", "salt", "sand", "save", "say", "school", "science", "scissors", "search", "seat", "second", "see", "sell", "send", "sentence", "serve", "seven", "several", "sex", "shade", "shadow", "shake", "shape", "share", "sharp", "sheep", "sheet", "shelf", "shine", "ship", "shirt", "shoe", "shoot", "shop", "short", "shoulder", "shout", "show", "sick", "side", "signal", "silence", "silly", "silver", "similar", "simple", "single", "sing", "sink", "sister", "sit", "six", "size", "skill", "skin", "skirt", "sky", "sleep", "slip", "slow", "small", "smell", "smile", "smoke", "snow", "soap", "sock", "soft", "someone", "something", "sometimes", "son", "soon", "sorry", "sound", "soup", "south", "space", "speak", "special", "speed", "spell", "spend", "spoon", "sport", "spread", "spring", "square", "stamp", "stand", "star", "start", "station", "stay", "steal", "steam", "step", "still","stomach", "stone", "stop", "store", "storm", "story", "strange", "street", "strong", "structure", "student", "study", "stupid", "subject", "substance", "successful", "sudden", "sugar", "suitable", "summer", "sun", "sunny", "support", "sure", "surprise", "sweet", "swim", "sword"
];

let presentWord = words[Math.floor(Math.random() * words.length)].toUpperCase().split('');
let guessedWord = presentWord.map(el => "");
let wrongWordsCount = 0;

let synonyms='Not Available!!',definition='Not Available!!';
window.addEventListener('load', async () => {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(el =>
        `<button class="key-btn" id="${el}">${el}</button>`).join('');

    document.querySelector('.keyboard').innerHTML = letter;

    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${presentWord.join('')}`)

    document.querySelector('.heading').style.display='block';
    
        response.json().then(data=>{
            let definitions=data[0].meanings[0].definitions[0];
            definition=definitions.definition;
            synonyms=definitions.synonyms;
            if(synonyms){
                synonyms=synonyms.splice(0,3);
                let sampSynonyms=synonyms;
                sampSynonyms.forEach((el,index)=>{
                    if(el.toUpperCase()===presentWord.join(''))
                        synonyms.splice(index,1);
                });
            }
            else
                synonyms='Not Available!!';
         });
    
});


document.querySelector('.hint-btn').addEventListener('click', () => {
    document.querySelector('.modal-bg').style.display = 'flex';
    document.getElementById('definition').textContent=definition;
    document.getElementById('synonym').textContent=synonyms;
});
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal-bg').style.display = 'none';
});


// const string="stomach, stone, stop, store, storm, story, strange, street, strong, structure, student, study, stupid, subject, substance, successful, sudden, sugar, suitable, summer, sun, sunny, support, sure, surprise, sweet, swim, sword";
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
    const result = type === 'correct' ? "Well Done!!" : "You Lost!!";
    const markup = `<h2 class="${type}-result">${result}</h2>`;
    document.querySelector('.guess-word').insertAdjacentHTML('afterend', markup);
};

const checkIfCorrect = () => {
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
