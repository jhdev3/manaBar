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

router.get("/admin/booking/", (req, res) => {
  console.log(req.query);
  if (req.query.token == "12312312378126asd1237123hajsdkj81238") {
    //Kollar behöverighet säker nät
    res.send("Hämta data så sicka data eller något"); //Inte svenska bokstäver med res.end  men med res.send kmr köra express resten av kursen
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
