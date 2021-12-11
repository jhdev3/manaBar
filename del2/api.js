let filmer = [];
const filmInput = document.querySelector("#film");
const filmList = document.querySelector("#films");
const formFilm = document.querySelector("#chooseFilm");
const pplSelect = document.querySelector("#choosePeople");

let people = [];

//Hade det varit stora arrayer så bör man nog göra fler get requests etc och prata mer med databas
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
  };
  forfragan.send();

  /* Hämtar people array Jippi värför gör det fler gånger :)*/
  peopleGetReq = new XMLHttpRequest();
  peopleGetReq.open("GET", "https://ghibliapi.herokuapp.com/people/");
  peopleGetReq.setRequestHeader("Content-Type", "application/json"); //Enligt deras hemsida :)
  peopleGetReq.onload = function () {
    console.log("Mottog svar från extern server");
    //console.log(this.response); // skriver ut ett fält med objekt i JSON-format
    people = JSON.parse(this.response);
    //console.log(people.length); Största arrayen så göra som vechile request hade nog blivit lite jobbigt
  };
  peopleGetReq.send();
};

/* Simon funktion fungerar lite data som visas kanske och hatner inte innerhtml= ""*/

/* Varför hämta vechicles 3 gånger när det går att hämta utifrån id tex?. 
    lite bättre att gör ett get request utifrån id.
*/
// Funkar det här för Ppl ?
function vehicleInput() {
  if (filmInput.value == "2baf70d1-42bb-4437-b551-e5fed5a87abe") {
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function () {
      var responseData = JSON.parse(this.response);
      console.log(responseData[0].name);
      document.getElementById("displayVehicle").innerHTML =
        responseData[0].name;
      // If description of the vehicle just add document.getElementById("displayVehicle").innerHTML = responseData[0].name + responseData[0].description
    };
    req.send();
  }
  if (filmInput.value == "ebbb6b7c-945c-41ee-a792-de0e43191bd8") {
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function () {
      var responseData = JSON.parse(this.response);
      console.log(responseData[1].name);
      document.getElementById("displayVehicle").innerHTML =
        responseData[1].name;
    };
    req.send();
  }
  if (filmInput.value == "758bf02e-3122-46e0-884e-67cf83df1786") {
    req = new XMLHttpRequest();
    req.open("GET", "https://ghibliapi.herokuapp.com/vehicles");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function () {
      var responseData = JSON.parse(this.response);
      console.log(responseData[2].name);
      document.getElementById("displayVehicle").innerHTML =
        responseData[2].name;
    };
    req.send();
  }
}

/* Onload functions*/
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
/* end onload functions*/

/* list submiter */
formFilm.addEventListener("submit", (e) => {
  e.preventDefault();
  /* Rensar lite i det gammla outputs bör också skapa en funktion eller show/hide section */
  imageDeletion();
  clearSelect();
  document.querySelector("#filmChoice").style.visibility = "hidden";

  document.querySelector("#errormsg").textContent = "";
  //console.log(filmInput.value);

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
  document.querySelector("#filmChoice").style.visibility = "visible";

  forEachMovieAttr(filmChoice);

  mangePeople(filmInput.value);
  filmInput.value = "";
});

function forEachMovieAttr(movie) {
  console.log(Object.keys(movie));
  const keyArray = Object.keys(movie);
  for (item of keyArray) {
    /* unit test
    console.log(typeof movie[item]);
    
    console.log(item);*/
    //tog reda på att arrrayerna var object
    //första if vill inte skriva ut dem här :)
    if (typeof movie[item] === "object" || item === "url" || item == "id") {
      //console.log(item);
      //if(item == people)
      //alt lösning getpplbyid(movie[item])
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
  let allImage = document.querySelectorAll("img");
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

/*Hantera People :)  borde funger varför castle in the sky skriver 7 i arrray men söker man id på google blir det rätt antal*/
// Vill man söka på ppl och få fram filmen så gör samma sak fast på film array tvärt om

//Verkar som att det här sättet faktiskt får med alla karaktärer och ppl arrayen i movie object inte är fullt uppdaterad
//troligt viss prequels eller uppföljningar på filmer
pplSelect.addEventListener("change", function (e) {
  let option = pplSelect.options[pplSelect.selectedIndex];

  //console.log(option.value);
  //console.log(option.text);
  const pplChoice = people.find((item) => {
    return item.id === option.value;
  });
  if (!pplChoice) {
    //Please choose and option grejen eller när det inte finns ppl inlagda i databasen
    document.querySelector("#gender").textContent = "";
    document.querySelector("#age").textContent = "";
    document.querySelector("#hair_color").textContent = "";
    document.querySelector("#eye_color").textContent = "";
    return;
  }
  console.log(pplChoice);
  document.querySelector("#gender").textContent = pplChoice.gender;
  document.querySelector("#age").textContent = pplChoice.age;
  document.querySelector("#hair_color").textContent = pplChoice.hair_color;
  document.querySelector("#eye_color").textContent = pplChoice.eye_color;
});

function mangePeople(movieId) {
  //kan göra en check för tom array ifall get req misslyckas men men
  let arrayPplInFilm = [];
  for (item of people) {
    //Jahopp flera person kan förekomma i flera filmer kanske sequels.
    //console.log(item.films);
    for (c of item.films) {
      if (c.search(movieId) != -1) {
        //console.log(item.name);
        arrayPplInFilm.push(item);
      }
    }
    /* FIlter hade varit nice om inte films var en array :) */
  }
  addToSelect(arrayPplInFilm);
}

function addToSelect(pplArray) {
  //console.log(pplSelect);
  for (p of pplArray) {
    // console.log("append");
    let option = document.createElement("OPTION");
    //console.log(option);
    option.value = p.id;
    option.text = p.name;
    // option.setAttribute("remove", "optionDelete");

    pplSelect.appendChild(option);
  }
}

function clearSelect() {
  //let allpplSelctoptions = document.querySelectorAll("optionDelete");
  // console.log(allpplSelctoptions);

  /* unit testing 
  console.log(allImage);
  console.log(allImage.length);
 */
  //incase u want to add more image otherwise just remove allImage[0]
  // console.log(pplSelect.options.length);
  //console.log(pplSelect.length);

  for (let i = pplSelect.length - 1; i >= 1; --i) {
    //console.log(pplSelect[i]);
    console.log(i);

    pplSelect.remove(i);
  }
}
/* Alternativ lössing är mycket sämre än den vi har då ppl array inte är uppdatera korekt 
  Kanske också inte funker blir många konstiga request är det asyncront osv..
*/

/*
function getpplbyid(pplaray) {
  let getpplArray = [];
  //HÄmtar en åt gången och inte hela ppl arren på 50+ personer.
  for (pplID of pplaray) {
    req = new XMLHttpRequest();
    req.open("GET", fetchID);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.onload = function () {
      let responseData = JSON.parse(this.response);
      getpplArray.push(responseData);
    };
    req.send();
  }
  return getpplArray;
}
*/
