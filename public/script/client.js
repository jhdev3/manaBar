window.onload = function () {
    
    let myForm = document.getElementById('myForm').value;
    let namn = document.getElementById('namn').value;
    let email = document.getElementById('email').value;
    let mnumer = document.getElementById('mnumer').value;
    let datum = document.getElementById('datum').value;
    let tid = document.getElementById('tid').value;

    /*
    let formError = document.getElementById('errormsg');
    formError.innerHTML = "Must be filled!"; */
    
    let check = true;

    myForm.addEventListener('submit', (e) => {
        if (namn.value=="" || email.value=="" || mnumer.value=="" || datum.value == "" || tid.value=="") {       
            alert("All details must be filled");
            check = false;
        }
        if (check == true) {
            alert('You form is submited.')
            return check;
        }

        e.preventDefault();
    });


   
}