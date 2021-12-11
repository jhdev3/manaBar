let adminToken = "";

/* Admin loggin*/
$("#adminLoggin").submit((e) => {
  e.preventDefault();
  //console.log($("#adminLoggin").serialize());
  //Skapar ett ajax och sänder.
  $.ajax({
    type: "GET",
    url: "/admin/login",
    data: $("#adminLoggin").serialize(), //Lite trevligt att ajax fixar queryn :) slipper sätta själv i xmhlhttp ;)
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
    url: "/admin/booking",
    data: { token: adminToken },
    success: function (res) {
      $("#loadData").text(res);
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
