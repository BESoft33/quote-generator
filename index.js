function fetchDataAndDisplay() {
    fetch('data.json') // Replace with the actual path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            for (const key in jsonData) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key;
                dropdown.appendChild(option);
            }
            selectedKey = document.getElementById("dropdown").value;
            max = jsonData[selectedKey].length-1;
            console.log(selectedKey)
            index = 0;
            if (jsonData[selectedKey] && jsonData[selectedKey][index] && jsonData[selectedKey][index].quote) {
                quoteParagraph.textContent = jsonData[selectedKey][index].quote;
                author.innerHTML = jsonData[selectedKey][index].author;
            } else {
                quoteParagraph.textContent = 'No quote available for this key.';
            }
            data = jsonData;

        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
}

// Call the function to fetch and display data
var data = fetchDataAndDisplay()

var dropdown = document.getElementById("dropdown");
const quoteParagraph = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
var fonts = document.querySelectorAll("input[name='font-size']");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var random = document.getElementById("random");

let index = 0;
let max = 0;

var selectedKey = null;
var data = null;


dropdown.addEventListener('change', function () {
    selectedKey = this.value;
    max = data[selectedKey].length-1;
    index = getRandomValue(0, max);
    if (data[selectedKey] && data[selectedKey][index] && data[selectedKey][index].quote) {
        quoteParagraph.textContent = data[selectedKey][index].quote;
        author.innerHTML = data[selectedKey][index].author;
    } else {
        quoteParagraph.textContent = 'No quote available for this key.';
    }
});

next.addEventListener("click", function () {
    index = (index+1) % max;
    quoteParagraph.textContent = data[selectedKey][index].quote;
    author.innerHTML = data[selectedKey][index].author;
})

prev.addEventListener("click", function () {
    index = (index <= 0 ? max : index-1);
    quoteParagraph.textContent = data[selectedKey][index].quote;
    author.innerHTML = data[selectedKey][index].author;
})

random.addEventListener("click", function () {
    index = getRandomValue(0, max, index);
    quoteParagraph.textContent = data[selectedKey][index].quote;
    author.innerHTML = data[selectedKey][index].author;
})

function getRandomValue(min, max, curr = null) {
    let rand = Math.floor(Math.random()  * (max - min + 1)) + min;
    if(curr === rand){
        rand = getRandomValue(0, max, curr= index)
    }
    return rand
}

var checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", function(){
    var bodyElement = document.body;
    var mainElement = document.querySelector('.main');
    var dropdown = document.querySelector("#dropdown");
    

    bodyElement.classList.toggle("dark-mode");
    mainElement.classList.toggle("light");
    mainElement.classList.toggle("dark");
    dropdown.classList.toggle("dark");
    next.classList.toggle("light");
    next.classList.toggle("dark");
    prev.classList.toggle("light");
    prev.classList.toggle("dark");
    random.classList.toggle("light");
    random.classList.toggle("dark");
    dropdown.classList.toggle("dark");
    dropdown.classList.toggle("light");

});


fonts.forEach(font=> {
    font.addEventListener("change", () =>{
        updateFontSize(font);
    })
})

function updateFontSize(size){
    switch(size.value){
        case 'sm':
            quoteParagraph.style.fontSize ='18px';
            break;
        case 'md':
            quoteParagraph.style.fontSize = '24px';
            break;
        case 'lg':
            quoteParagraph.style.fontSize = '32px';
            break;
        default:
            quoteParagraph.style.fontSize = '28px';

    }
}






