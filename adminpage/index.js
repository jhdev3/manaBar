//ServerScript för manaBar
//Använder express

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


/* Routing refers to determining how an application responds to a client request to a particular endpoint, 
which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
Res = respond, req är request :)

*/

app.get('/', (req, res) => {


  //Res är 
  res.send('<h1>HEj Hej Express</h1>'); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen

});

// Internet-protokollen TCP och UDP använder portar numrerade 0–65 535
server.listen(4000, () => {  
  console.log('listening on *:4000');
});
console.log("Hejsan");
