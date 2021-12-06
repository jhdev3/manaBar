let express = require("express");

let router = express.Router(); //Alla routes lagras i router

router.get("/", (req, res) => {
  //Res är
  res.sendFile(__dirname + "/index.html"); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
});

router.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/adminpage/admin.html"); //Inte svenska bokstäver med res.end men med res.send kmr köra express resten av kursen
});

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
