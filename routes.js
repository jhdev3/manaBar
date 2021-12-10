let express = require("express");
let router = express.Router(); //Alla routes lagras i router
const { check, validationResult } = require("express-validator"); // iportera express validator

//router.use(express.static("public")); // to access client script

const { ReadFile, WriteFile } = require("./module/readAndWrite");

let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

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
router.get("/form", (req, res) => {
  res.sendFile(__dirname + "/SubPages/Bokabord.html");
  //res.sendFile(path.join(__dirname, 'SubPages', "Bokabord.html"));
});

router.post("/form/submitBokaBord", (req, res) => {
  console.log(req.body);
  //Ondskefull input allow här skriver till innerHtml på admin sidan vilket inte är bra
  if (req.body[0] != "") {
    const writeToFile = new WriteFile();
    //Viktigt att req.body är JSON object vet inte än Simon får testa
    writeToFile.appendData(
      JSON.stringify(req.body),
      __dirname + "/db/bokabord.txt"
    );
    res.status(201).send("lyckad bookning");
  } else {
    res.status(406);
  }
});

let fs = require("fs");

router.post("/form/submitInfo", (req, res) => {
  console.log(req.body);
  let data = JSON.stringify(req.body);

  /* Unit test   */

  fs.appendFile("text.json", data, (err) => {
    if (err) throw err;
    console.log("Info is saved to text file.");
  });
  /* let formInfo = {
      namn: req.query.namn,
      email: req.query.email,
      mnumer: req.query.mnumer,
      datum: req.query.datum,
      tid: req.query.tid,
    };

    
    fs.appendFile("text.json", data, (err) => {
      if (err) throw err;
      console.log("Info is saved to text file.");
    });
  */
  /* const errors = validationResult(req); //save errors in json
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // send errors till json
  }
*/
  res.send("bookning Lyckades");
});

//Qabas end

//app.use(express.urlencoded());  samma som express.json gissar jag för body och post

/*

*/
const adminToken = "12312312378126asd1237123hajsdkj81238"; //Behöver autgeneras och ha någon tid rekvid egentligen men nu är den statisk

//post req.body."name" fungerar i post inte i get xD
router.get("/admin/login", (req, res) => {
  const adminPassword = "Password123"; //adminPassword Kolla med namn + regexp om man känner för det. borde crypteras.
  const adminUser = "Admin";
  //unit testing
  //console.log(req.query.userAdmin);
  // console.log(req.query.password);

  if (req.query.userAdmin == adminUser && req.query.password == adminPassword) {
    //res.send(bokaBord + ' <---Bokabord   Bokadator---> ' + bokaDator);
    res.send(adminToken);
    // console.log("Inlogg succesfull");
    //console.log(bokaBord);
    //console.log(bokaDator);
  } else {
    console.log(
      "Felaktigt lössenord eller användare: " +
        req.query.userAdmin +
        " " +
        "  " +
        req.query.password
    );
    res.status(403).send("Invalid UserName or Password");
  }
});

router.get("/api/bokabord/", (req, res) => {
  console.log(req.query);
  if (req.query.token == "12312312378126asd1237123hajsdkj81238") {
    const data = new ReadFile(__dirname + "/db/bokabord.txt");
    //Kollar behöverighet säker nät
    res.json(data.getJsonObj()); //Inte svenska bokstäver med res.end  men med res.send kmr köra express resten av kursen
  }
});

//Enbart den här som körs på admin sidan
router.get("/api/bokadator/", (req, res) => {
  console.log(req.query);

  if (req.query.token == "12312312378126asd1237123hajsdkj81238") {
    const data = new ReadFile(__dirname + "/db/bokabord.txt");
    //behöver någon form av kontroll vid tom datasträng fil dvs ""
    //nu ser jag till att filen finns + att data finns i filen
    //Kollar behöverighet säker nät
    res.json(data.getJsonObj()); //Inte svenska bokstäver med res.end  men med res.send kmr köra express resten av kursen
  } else {
    res.status(403);
  }
});
//app.use(express.urlencoded());  samma som express.json gissar jag för body och post

//post req.body."name" fungerar i post inte i get xD
router.post("/api/bokabord", (req, res) => {
  res.send("lyckad bookning");
});

router.post("/api/bokadator", (req, res) => {
  console.log(req.body);
  if (req.body[0] != "") {
    const writeToFile = new WriteFile();
    //Viktigt att req.body är JSON object vet inte än Simon får testa
    writeToFile.appendData(
      JSON.stringify(req.body),
      __dirname + "/db/bokadator.txt"
    );
    res.status(201).send("lyckad bookning");
  } else {
    res.status(406);
  }
});
module.exports = router;

//
//    <script src="javascript/gbook.js"></script>

/* */
