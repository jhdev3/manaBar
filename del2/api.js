let filmer = [];

const filmInput = document.querySelector("#film");
const filmList = document.querySelector("#films");
const formFilm = document.querySelector("#chooseFilm");
const species = document.querySelector("species"); // Sofia

window.onload = () => {
  console.log("page is fully loaded");
  document.querySelector("#filmChoice").style.visibility = "hidden";

  /*Hämtar alla filmer och sparar i filmer array stor db långsam sid laddning*/
  forfragan = new XMLHttpRequest();
  forfragan.open("GET", "https://ghibliapi.herokuapp.com/films");
  forfragan.setRequestHeader("Content-Type", "application/json"); //Enligt deras hemsida :)
  forfragan.onload = function () {
    console.log("Mottog svar från extern server");
    //console.log(this.response); // skriver ut ett fält med objekt i JSON-format
    filmer = JSON.parse(this.response);
    //console.log(filmer.length);
    appendAllFilms();
    getAllSpecies();
  };
  forfragan.send();
};
/* Onload functions*/
function getAllSpecies(){
  species = "";
  for(let i = 0; i < filmer.length; i++){
    species += filmer[i].species;
  };
  console.log(species);
};
function appendAllFilms() {
  //skapar dem i ordning så går att sätta id som plats i arrayen ;)
  for (film of filmer) {
    /* unit testing 
        console.log(film.title);

    console.log(film);
    console.log(film.title); */
    //console.log(film.species);

    createOption(film.id, film.title);
  }
}

function vehicleInput(){
  if(filmInput.value == "2baf70d1-42bb-4437-b551-e5fed5a87abe"){
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function(){
      var responseData = JSON.parse(this.response);
        console.log(responseData[0].name);
        document.getElementById("displayVehicle").innerHTML = responseData[0].name;
      // If description of the vehicle just add document.getElementById("displayVehicle").innerHTML = responseData[0].name + responseData[0].description
        
    }
    req.send();
  }
  if(filmInput.value == "ebbb6b7c-945c-41ee-a792-de0e43191bd8"){
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function(){
      var responseData = JSON.parse(this.response);
        console.log(responseData[1].name);
        document.getElementById("displayVehicle").innerHTML = responseData[1].name;
    }
    req.send();
  }
  if(filmInput.value == "758bf02e-3122-46e0-884e-67cf83df1786"){ 
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function(){
      var responseData = JSON.parse(this.response);
        console.log(responseData[2].name);
        document.getElementById("displayVehicle").innerHTML = responseData[2].name;
    }
    req.send();
  }
}

function createOption(id, title) {
  let option = document.createElement("OPTION");
  //console.log(option);
  option.value = id;
  option.text = title;
  filmList.appendChild(option);
}
/* end onload functions*/

/* list submiter */
formFilm.addEventListener("submit", (e) => {
  e.preventDefault();
  /* Rensar lite i det gammla outputs bör också skapa en funktion eller show/hide section */
  imageDeletion();
  document.querySelector("#filmChoice").style.visibility = "hidden";

  document.querySelector("#errormsg").textContent = "";
  //console.log(filmInput.value);

  const filmChoice = filmer.find((item) => {
    return item.id === filmInput.value;
  });
  console.log(filmChoice);
  const
  //Felhantering av inputs kollar undefiend
  if (!filmChoice) {
    document.querySelector(
      "#errormsg"
    ).textContent = `Filmen ${filmInput.value} finns inte`;
    return;
  }
  /*Bör skapa någon funktion som hanterar alla outputs */
  document.querySelector("#filmChoice").style.visibility = "visible";  

  forEachMovieAttr(filmChoice);
  //document.querySelector("#title").textContent = filmChoice.title;
  //document.querySelector("#description").textContent = filmChoice.description;
  filmInput.value = "";
});

function forEachMovieAttr(movie) {
  console.log(Object.keys(movie));
  const keyArray = Object.keys(movie);
  for (item of keyArray) {
    /* unit test
    console.log(typeof movie[item]);
    console.log(item);*/

    if (typeof movie[item] === "object" || item === "url" || item == "id") {
      console.log(item);
    } else if (item == "image" || item == "movie_banner") {
      //console.log(item);
      creatImage(movie[item], movie.title, item);
    } else {
      document.querySelector(`#${item}`).textContent = " " + movie[item];
      /* unit testing 
      
      console.log(document.querySelector(`#${item}`));
      console.log(movie[item]); 
      */
     
    }
  }
}
function creatImage(link, titel, dest) {
  let image = document.createElement("img");
  const imgOut = document.querySelector("#out-" + dest);
  //console.log("#out-" + dest);
  image.src = link;
  image.alt = titel + " " + dest;
  imgOut.appendChild(image);
}
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
/* end ---- list submiter */

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
