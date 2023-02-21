

let input = document.querySelector("input");
let meaning = document.querySelector("#meaning");
let wordText = document.querySelector("#title");
let meaningText = document.querySelector(".meaning-text");
let info = document.querySelector(".info");
let audioSrc = document.querySelector("audio");


const API_KEY = "nHWaMfowEd1D5F55STUy7Q==d1Ql2Ol31bZWcBUM";

const options = {
  method: "GET",
}

async function fetAPI(word) {

  try {

    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;


    info.style.display = "block";
    info.textContent = `Searching "${word}"...`;

    let res = await fetch(apiURL, options);
    let data = await res.json();

    if (data !== "") {
      meaningText.classList.add("display");

      // let wordMen = data[0].meanings[1].definitions;
      // wordMen.map((item) => {
      //   meaning.innerHTML = ` <p> ${item.antonym} </p> `;
      //   console.log();
      // })

      if (data[0].meanings[0].definitions[0].definition !== "") {
        meaning.innerHTML = `
        <br> 1. ${data[0].meanings[0].definitions[0].definition} 
        <br> 2. ${data[0].meanings[0].definitions[1].definition}`;
      }
      // if (data[0].meanings[0].definitions[1].definition !== "") {
      //   meaning.innerHTML += `<br> 2. ${data[0].meanings[0].definitions[1].definition}`;
      // }
      // if (data[0].meanings[0].definitions[2].definition !== "") {
      //   meaning.innerHTML += `<br> 3. ${data[0].meanings[0].definitions[2].definition}`;
      // }
      // if (data[0].meanings[0].definitions[3].definition !== "") {
      //   meaning.innerHTML += `<br> 4. ${data[0].meanings[0].definitions[3].definition}`;
      // }

      wordText.textContent = data[0].word;
      wordText.style.textTransform = "uppercase";

      audioSrc.src = data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio || data[0].phonetics[3].audio;
    }
    info.style.display = "none";

  } catch (error) {
    info.textContent = "The word \"" + word + "\" is not Found";
    meaningText.classList.remove("display");
  }
}

input.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetAPI(e.target.value);
  }
})