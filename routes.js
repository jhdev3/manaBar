let express = require("express");

let router = express.Router(); //Alla routes lagras i router
const { check, validationResult } = require('express-validator'); // iportera express validator

//router.use(express.static("public")); // to access client script

router.get("/", (req, res) => {
  //Res är
  res.sendFile(__dirname + "/index.html"); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
});

router.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/adminpage/admin.html"); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
});

//Qabas start
//npm install express nodemon fs express-validator
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
router.get('/form', (req, res) => {
  res.sendFile(__dirname + "/SubPages/Bokabord.html");
  //res.sendFile(path.join(__dirname, 'SubPages', "Bokabord.html"));
});

let fs = require('fs');

router.get('/submitInfo', [
  check ('namn').notEmpty().withMessage('Ange ditt namn'),
  check ('email').notEmpty().withMessage('Ange din email').isEmail(),
  check ('mnumer').notEmpty().withMessage('Ange ditt mobil nummer'),
  check ('datum').notEmpty().withMessage('Ange bokningsdatum').isDate(),
  check ('tid').notEmpty().withMessage('Ange bokningstid'),
],
(req, res) => {

    let formInfo = {
        namn: req.query.namn,
        email: req.query.email,
        mnumer: req.query.mnumer,
        datum: req.query.datum,
        tid: req.query.tid
    }

    let data = JSON.stringify(formInfo);

    fs.appendFile("text.json", data, (err) => { 
        if (err) throw err;
        console.log('Info is saved to text file.');
});

const errors = validationResult(req); //save errors in json
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array( )}); // send errors till json
    }

res.send('/form');

});

//Qabas end


//app.use(express.urlencoded());  samma som express.json gissar jag för body och post

/*

*/
//post req.body."name" fungerar i post inte i get xD
router.get("/admin/login", (req, res) => {
  const adminPassword = "Password123"; //adminPassword Kolla med namn + regexp om man känner för det. borde crypteras.
  const adminUser = "Admin";
  let userAray = { name: adminUser, password: adminPassword };
  let bokaBord = ["item1", "item2", "osv"];
  let bokaDator = ["boakdatorobjek1", "boakdatorobjek1", "osv"];

  console.log(req.query.userAdmin);
  console.log(req.query.password);

  if (req.query.userAdmin == adminUser && req.query.password == adminPassword) {
    //res.send(bokaBord + ' <---Bokabord   Bokadator---> ' + bokaDator);
    res.send("loginToken: 12312312378126asd1237123hajsdkj81238");
    console.log("Inlogg succesfull");
    console.log(bokaBord);
    console.log(bokaDator);
  } else {
    console.log(
      "Felaktigt lössenord eller användare: " +
        req.query.userAdmin +
        " " +
        "  " +
        req.query.password
    );
    res.status(403); //Kan kolla status när den försöker läsa får inte komma dit typ error 403 frobbiden acces //Det där funkar :)
  }
});

router.get("/booking/", (req, res) => {
  if (req.query.token == "12312312378126asd1237123hajsdkj81238") {
    //Kollar behöverighet säker nät
    res.send("lyckad post"); //Inte svenska bokstäver med res.end  men med res.send kmr köra express resten av kursen
  }
});

//app.use(express.urlencoded());  samma som express.json gissar jag för body och post

//post req.body."name" fungerar i post inte i get xD
router.post("/api/bokabord", (req, res) => {
  res.send("lyckad bookning");
});
router.post("/api/bokadator", (req, res) => {
  if (req.body[0] != "") {
    res.status(201).send("lyckad bookning");
  } else {
    res.status(406).send("vad försöker du göra?");
  }
});
module.exports = router;

//
//    <script src="javascript/gbook.js"></script>

/* */
