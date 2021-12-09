$("#adminLoggin").submit((e) => {
  console.log("test");
  e.preventDefault();
  console.log($("#adminLoggin").serialize());
  $.ajax({
    type: "GET",
    url: "/admin/login",
    data: $("#adminLoggin").serialize(),
    success: function (response) {
      console.log(response);
    },
    error: function (request, status, error) {
      alert(request.responseText);
    },
  });
});
