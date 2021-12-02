//ServerScript för manaBar
//Använder express

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const routes = require("./routes"); 

app.use(express.json()); //så att .body och och kan parse som JSON. i post :)
app.use(express.static(__dirname + '/public')); //Publik css javascript images
app.use(routes);


// Internet-protokollen TCP och UDP använder portar numrerade 0–65 535
server.listen(4000, () => {  
  console.log('listening on *:4000');
});
console.log("Hejsan");



