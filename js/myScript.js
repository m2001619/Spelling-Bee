/* Checks */
let angleCheck = false;
/* Variables */
let input = document.querySelector(".input");
let textFiled = document.querySelector(".input .text-filed");
let angle = document.querySelector(".angle");
let polygon = document.querySelectorAll(".hexagons polygon");
let hexagons = document.querySelectorAll("svg");
let hexagonTexts = document.querySelectorAll(".hexagons text");
let delet = document.querySelector(".delete");
let shuffle = document.querySelector(".shuffle");
let enter = document.querySelector(".enter");
let circles = document.querySelectorAll(".output .circle");
let square = document.querySelector(".output .square");
let wordsNumber = document.querySelector(".output .words-number");
let answers = document.querySelector(".answers");
let dictionaryArray = readFile("js/dictionary.json");
let englishLetters = `abcdefghijklmnopqrstuvwxyz`.split(``);
let answerWords = []
let sevenLetters = [];
let pangramWords = [];
let score = 0;
let appendAnswers = [];
let appendScore = 0;
let check = false;
playGame();
console.log(answerWords);

// Set Letters In Hexagons Text
hexagonTexts.forEach(function(text,i){
    text.textContent = sevenLetters[i];
})

/* Start Events */
angle.onclick = function() {
    if(!angleCheck) {
        angle.style.transform = "rotate(180deg)";
        answers.classList.replace("d-none","d-block");
        input.classList.replace("d-flex","d-none");
        angleCheck = true;
    }else {
        angle.style.transform = "rotate(360deg)";
        answers.classList.replace("d-block","d-none");
        input.classList.replace("d-none","d-flex");
        angleCheck = false;
    }
}

hexagons.forEach(function(e,i){
    e.onclick = function() {
        console.log(i);
        /* Append Letters in Text */
        let text = document.createElement(`span`);
        text.textContent = sevenLetters[i].toLocaleUpperCase();
        text.classList.add("fw-bold","fs-3");
        if(i == 2)
        text.classList.add("import-letter");
        textFiled.appendChild(text);
        /* Styling hexagons */
        polygon[i].setAttribute("points","10,51.96152422706631 30,10 90,10 110,51.96152422706631 90,93.92304845413263 30,93.92304845413263");
        if(i !== 2) {
            polygon[i].style.fill = "#dcdcdc";
        }
        setTimeout(function(){
            polygon[i].setAttribute("points","0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263");
            if(i !== 2) {
                polygon[i].style.fill = "#e6e6e6";
            }
        },100);
    }
})

// Delete Event
delet.onclick = function(){
    if(textFiled.children.length > 0)
        textFiled.removeChild(textFiled.children.item(textFiled.children.length - 1));
}

// Shuffle Event
shuffle.onclick = function(){
    let importantChar = sevenLetters[2];
    let arrBefore = sevenLetters.filter((e,i) => i!== 2);
    let arrAfter = [];
    let shuffledNumbers = [];
    arrBefore.forEach(function(){
        let i = Math.floor(Math.random() * 6);
        if(!shuffledNumbers.includes(i)){
            shuffledNumbers.push(i);
        }else {
            while(shuffledNumbers.includes(i)){
                i = Math.floor(Math.random() * 6);
            }
            shuffledNumbers.push(i);
        }
    })
    shuffledNumbers.forEach((e) => arrAfter.push(arrBefore[e]));
    arrAfter.splice(2,0,importantChar);
    sevenLetters = arrAfter;
    hexagonTexts.forEach(function(text,i){
        if( i!== 2) {
            text.textContent = "";
            setTimeout(function(){
                text.textContent = sevenLetters[i];
            },400);
        }else {
            text.textContent = sevenLetters[i];
        }
    })
}

// Enter Event
enter.onclick = function(){entr();}
function entr() {
    let text = ``;
    let checkLetter = false;
    for(i=0;i<textFiled.children.length;i++){
        text += textFiled.children.item(i).textContent.toLocaleLowerCase();
    }
    text.split(``).forEach(function(e){
        if(!sevenLetters.includes(e)){
            checkLetter = true;
        }
    })
    if(checkLetter){
        setTimeout(function(){errorAlert(`The word includes letters not in the beehive.`);},100);
    }else if(text.length < 4) 
        setTimeout(function(){errorAlert(`The word does not include at least four letters`);},100);
    else if(!text.includes(sevenLetters[2])) 
        setTimeout(function(){errorAlert(`The word does not include the center letter`);},100);
    else if(!answerWords.includes(text))
        setTimeout(function(){errorAlert(`The word is not in the dictionary`);},100);
    else if(appendAnswers.includes(text)){
        setTimeout(function(){errorAlert(`The user has already found the word and is not allowed to score it twice`);},100);
    }else {
        appendAnswers.push(text);
        let p = document.createElement(`p`);
        p.textContent = text;
        answers.appendChild(p);
        if(pangramWords.includes(text))
            appendScore += text.length;
        else 
            appendScore += text.length - 3;
        wordsNumber.textContent = appendAnswers.length;
        if(appendScore < (score / circles.length) * 1){
            circles.item(0).setAttribute(`score`,`${appendScore}`);
        }else if(appendScore < (score / circles.length) * 2){
            circles.item(0).removeAttribute(`score`);
            circles.item(0).classList.replace(`active-level`,`active`);
            circles.item(1).setAttribute(`score`,`${appendScore}`);
            circles.item(1).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 3){
            circles.item(1).removeAttribute(`score`);
            circles.item(1).classList.replace(`active-level`,`active`);
            circles.item(2).setAttribute(`score`,`${appendScore}`);
            circles.item(2).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 4){
            circles.item(2).removeAttribute(`score`);
            circles.item(2).classList.replace(`active-level`,`active`);
            circles.item(3).setAttribute(`score`,`${appendScore}`);
            circles.item(3).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 5){
            circles.item(3).removeAttribute(`score`);
            circles.item(3).classList.replace(`active-level`,`active`);
            circles.item(4).setAttribute(`score`,`${appendScore}`);
            circles.item(4).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 6){
            circles.item(4).removeAttribute(`score`);
            circles.item(4).classList.replace(`active-level`,`active`);
            circles.item(5).setAttribute(`score`,`${appendScore}`);
            circles.item(5).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 7){
            circles.item(5).removeAttribute(`score`);
            circles.item(5).classList.replace(`active-level`,`active`);
            circles.item(6).setAttribute(`score`,`${appendScore}`);
            circles.item(6).classList.add(`active-level`)
        }else if(appendScore < (score / circles.length) * 8){
            circles.item(6).removeAttribute(`score`);
            circles.item(6).classList.replace(`active-level`,`active`);
            circles.item(7).setAttribute(`score`,`${appendScore}`);
            circles.item(7).classList.add(`active-level`)
        }else {
            circles.item(7).removeAttribute(`score`);
            circles.item(7).classList.replace(`active-level`,`active`);
            square.classList.add(`active`);
            setTimeout(function(){successAlert(`You have Complete the game`);},100);
        }
    }
    textFiled.replaceChildren();
}


// Keyboard Event
document.addEventListener('keydown', (e) => {
    /* Append Letters in Text */
    if(englishLetters.includes(e.key)) {
        let text = document.createElement(`span`);
        text.textContent = e.key.toLocaleUpperCase();
        text.classList.add("fw-bold","fs-3");
        if(e.key === sevenLetters[2])
            text.classList.add("import-letter");
        else if(!sevenLetters.includes(e.key)) 
            text.classList.add("not-from-letter");
        textFiled.appendChild(text);
    }else if(e.key === `Backspace`) {
        if(textFiled.children.length > 0)
        textFiled.removeChild(textFiled.children.item(textFiled.children.length - 1));
    }else if(e.key === `Enter`) {
        entr();
    }
});
/* End Events */

/* Start Functions */

/* Read File */
function readFile(path) {
    let dictionary = [];
    let file = new XMLHttpRequest();
    file.open("GET",path);
    file.send();
    file.onreadystatechange = function() {
        if(file.readyState === 4 && file.status === 200) { 
            localStorage.setItem(`dic`,Object.keys(JSON.parse(file.responseText)));
        }
    }
    if(localStorage.getItem(`dic`)){
    dictionary = localStorage.getItem(`dic`).split(`,`);
    }else {
        errorAlert("please, Refresh the page again");
    }
    localStorage.removeItem(`dic`);
    return dictionary;
}

/* isPangram */
function isPangram(word) {
    let chars = [...word];
    if(word.length != 7)
        return false;
    else {
        for(i = 0; i < chars.length; ++i) {
            for(j = 0; j < chars.length; ++j) {
                if (i != j && chars[j] == chars[i]) {
                    return false;
                }
            }
        }
        return true;
    }
}

/* Pangram Word In Dictionary */
function pangramWordInDictionary(dictionaryArray) {
    let arr = [];
    dictionaryArray.forEach(function(e){
        if(isPangram(e)) 
            arr.push(e);
    })
    return arr;
}

/* Random Letters */
function randomLetters(dictionaryArray) {
    let inDictionary = pangramWordInDictionary(dictionaryArray);
    let i = Math.floor(Math.random() * inDictionary.length);
    return [...inDictionary[i]];
}

/* Filter From Dictionary */
function filterFromDictionary(dictionaryArray) {
    let answerWords = [];
    console.log(sevenLetters);
    dictionaryArray.forEach(function(e){
        if(e.length > 3) {
            let arr = [...e];
            let importantChar = false;
            let check = false;
            for(i=0;i<arr.length;i++){
                check = sevenLetters.includes(arr[i]);
                if(arr[i] === sevenLetters[2]) {
                    importantChar = true;
                }
                if(!check) {
                    break;
                }
            }
            if (check && importantChar) {
                answerWords.push(e);
            }
        }
    })
    return answerWords;
}

/* Set Score And Paragram Words */

function setScoreAndParagramWords(answerWords) {
    let pangramWords = [];
    let score = 0;
    answerWords.forEach(function(e){
        if (isPangram(e) && !pangramWords.includes(e)) {
            pangramWords.push(e);
            score += 7;
        } else {
            score += e.length - 3;
        }
    })
    return [score,pangramWords];
}

// Play The Game 
function playGame() {
    sevenLetters = randomLetters(dictionaryArray);
    answerWords = filterFromDictionary(dictionaryArray);
    score = setScoreAndParagramWords(answerWords)[0];
    pangramWords = setScoreAndParagramWords(answerWords)[1];
    while(pangramWords.length === 0 || score < 50 || score > 444) {
        while(answerWords.length < 21 || answerWords.length > 81) {
            sevenLetters = randomLetters(dictionaryArray);
            answerWords = filterFromDictionary(dictionaryArray);
        }
        score = setScoreAndParagramWords(answerWords)[0];
        pangramWords = setScoreAndParagramWords(answerWords)[1];
    }
}


/* End Functions */

/* Start Alert */
function errorAlert(alert) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${alert}`,
    })
}
function successAlert(alert) {
    Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: `${alert}`,
    })
}
/* End Alert */