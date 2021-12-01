//ServerScript för manaBar
//Använder express

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const adminPassword = "P@ssword123"; //adminPassword Kolla med namn + regexp om man känner för det. 
const adminUser ="Admin";

app.get('/admin/password', (req, res) => {
    let userAray = {name: adminUser, password: adminPassword};
    //req.params;
    //console.log(req.params);
    console.dir(req.params.name);
    console.dir(req.params[0]);
    console.dir(req.originalUrl);
    console.dir(req.route);

    res.send("Hejsan");
    /*
    if(req.name == adminUser && req.password == adminPassword){
        res.send('Grattis du kan logga in'); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
    }
    else{
        res.send("Felaktigt bla bla");
    }*/
});

app.post('/api/booking/', (req, res) => {
    res.send('lyckad post'); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
  
  });

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
