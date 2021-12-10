window.onload = function () {
  //let myForm = document.getElementById('myForm');
  let namn = document.getElementById("namn");
  let email = document.getElementById("email");
  let mnumer = document.getElementById("mnumer");
  let datum = document.getElementById("datum");
  let tid = document.getElementById("tid");

  document.getElementById("myForm").addEventListener("submit", (e) => {
    const namnValue = namn.value;
    const emailValue = email.value;
    const mnumerValue = mnumer.value;
    const datumValue = datum.value;
    const tidValue = tid.value;

    if (namnValue === "") {
      e.preventDefault();
      setErrorFor("namn");
    }
    /*
    if (emailValue === "") {
      e.preventDefault();
      setErrorFor("email");
    } else if (!isEmail(emailValue)) {
      setErrorFor("email");
    }*/
    if (mnumerValue === "") {
      e.preventDefault();
      setErrorFor("mnumer");
    }
    if (datumValue === "") {
      e.preventDefault();
      setErrorFor("datum");
    }
    if (tidValue === "") {
      e.preventDefault();
      setErrorFor("tid");
    }
  });

  function setErrorFor(id) {
    let formError = document.getElementById(`${id}-errormsg`);
    console.log(formError);
    formError.innerHTML = "Must be filled!";
  }

  function isEmail(email) {
    return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z])$/.test(email);
  }
};
