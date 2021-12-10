let adminToken = "";

/* Admin loggin*/
$("#adminLoggin").submit((e) => {
  e.preventDefault();
  //console.log($("#adminLoggin").serialize());
  //Skapar ett ajax och sänder.
  $.ajax({
    type: "GET",
    url: "/admin/login",
    data: $("#adminLoggin").serialize(),
    success: function (res) {
      console.log(typeof res);
      adminToken = res;
      // console.log(adminToken);
      document.querySelector(".buttom").disabled = true;
      $("#loggin_cont").fadeOut(3000);
      $("#outPut").show();
    },
    error: function (res) {
      console.log(res);
    },
    statusCode: {
      403: function (response) {
        // const errorMsg = JSON.parse(response);
        $("#error-text").text(response.responseText);
      },
    },
  });
});

/* Går att kalla på funktioner som gör get requests i success på admin loggin*/

$("#loadBokabord").on("click", () => {
  // console.log(adminToken);
  $.ajax({
    type: "GET",
    url: "/api/bokabord",
    data: { token: adminToken },
    success: function (res) {
      let json = JSON.parse(res);
      console.log(json);
      //$("#printData").text(writeAllJsonObj(json));
      document.querySelector("#printData").innerHTML = writeAllJsonObj(json);
    },
    error: function (res) {
      console.log(res);
    },
    statusCode: {
      403: function (res) {
        // const errorMsg = JSON.parse(response);
        console.log(res);
      },
    },
  });
});

//Skriver snabbt innerHtml bättre att appenda saker osv för att sätta klasser rätt :)
function writeAllJsonObj(json) {
  let createTable = "";
  createTable += "<tr><th>Object name</th><th>Value</th></tr>";
  let counter = 1;
  for (obj of json) {
    console.log("start obj");

    let keys = Object.keys(obj);
    for (inline of keys) {
      console.log("iter inside");
      createTable += "<tr>";
      createTable += "<td>" + inline + "</td>" + "<td>" + obj[inline] + "</td>";
      createTable += "</tr>";
    }
    console.log("finsihed inside");

    // createTable += "</section>";
    ++counter;
    console.log("Counter " + counter);
  }

  console.log(createTable);
  return createTable;
}
//Tänkte sätta varanan omslutande tr men tabeler funkar inte så ;)
function OddOrEven(number) {
  if (counter % 2 === 0) {
    return "<tr class='even'>";
  } else {
    return "<tr class='odd'>";
  }
}
