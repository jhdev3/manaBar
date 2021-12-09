let filmer = [];
const filmInput = document.querySelector("#film");
const filmList = document.querySelector("#films");
const formFilm = document.querySelector("#chooseFilm");
const imgOut = document.querySelector("#imgOut");

window.onload = (event) => {
  console.log("page is fully loaded");

  /*Hämtar alla filmer och sparar i filmer array */
  forfragan = new XMLHttpRequest();
  forfragan.open("GET", "https://ghibliapi.herokuapp.com/films");
  forfragan.setRequestHeader("Content-Type", "application/json"); //Enligt deras hemsida :)
  forfragan.onload = function () {
    console.log("Mottog svar från extern server");
    //console.log(this.response); // skriver ut ett fält med objekt i JSON-format
    filmer = JSON.parse(this.response);
    //console.log(filmer.length);
    appendAllFilms();
  };
  forfragan.send();
};

function imageDeletion() {
  const allImage = document.querySelectorAll("img");
  /* unit testing 
  console.log(allImage);
  console.log(allImage.length);
 */
  //incase u want to add more image otherwise just remove allImage[0]
  if (allImage.length > 0) {
    {
      for (i of allImage) {
        // console.log("Removing: " + i);
        i.remove();
      }
    }
  }
}
formFilm.addEventListener("submit", (e) => {
  e.preventDefault();
  /* Rensar lite i det gammla outputs bör också skapa en funktion eller show/hide section */
  imageDeletion();
  document.querySelector("#errormsg").textContent = "";
  console.log(filmInput.value);

  const filmChoice = filmer.find((item) => {
    return item.id === filmInput.value;
  });
  console.log(filmChoice);
  //Felhantering av inputs kollar undefiend
  if (!filmChoice) {
    document.querySelector(
      "#errormsg"
    ).textContent = `Filmen ${filmInput.value} finns inte`;
    return;
  }
  /*Bör skapa någon funktion som hanterar alla outputs */
  document.querySelector("#title").textContent = filmChoice.title;
  document.querySelector("#description").textContent = filmChoice.description;
  filmInput.value = "";
  creatImage(filmChoice.image, filmChoice.title);
});

function creatImage(link, titel) {
  let image = document.createElement("img");
  image.src = link;
  image.alt = titel + " movie pooster";
  imgOut.appendChild(image);
}

function appendAllFilms() {
  //skapar dem i ordning så går att sätta id som plats i arrayen ;)
  for (film of filmer) {
    /* unit testing 
        console.log(film.title);

    console.log(film);
    console.log(film.title); */
    createOption(film.id, film.title);
  }
}

function createOption(id, title) {
  let option = document.createElement("OPTION");
  //console.log(option);
  option.value = id;
  option.text = title;
  filmList.appendChild(option);
}

/* Tanken var att skapa några options efter man söker men känss bättre att ladda alla direkt 
    Gör inget för tillfället men låter den vara kvar :)
*/
filmInput.addEventListener("keydown", (event) => {
  // console.log(event.target.value.length);
  //Det blir efter 3 chars, första char räcknas som 0 dvs positionen den har;)
  if (event.target.value.length >= 2) {
    //console.log(event.target.value);
  }
});
