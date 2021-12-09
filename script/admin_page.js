$("#adminLoggin").submit((e) => {
  console.log("test");
  e.preventDefault();
  console.log($(this).serialize());
  $.ajax({
    type: "GET",
    url: "http://localhost:4000/admin/login",
    data: $(this).serialize(),
    success: function (response) {
      console.log(response);
    },
    error: function (request, status, error) {
      alert(request.responseText);
    },
  });
});
