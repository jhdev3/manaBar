window.onload = function () {
    
    //let myForm = document.getElementById('myForm');
    let namn = document.getElementById('namn').value;
    let email = document.getElementById('email').value;
    let mnumer = document.getElementById('mnumer').value;
    let datum = document.getElementById('datum').value;
    let tid = document.getElementById('tid').value;


    document.getElementById('myForm').addEventListener('submit', (e) => {
        
        checkInputs();

        function checkInputs() {

            const namnValue = namn.value;
            const emailValue = email.value;
            const mnumerValue = mnumer.value;
            const datumValue = datum.value;
            const tidValue = tid.value;
    
            if(namnValue === "" ) {
                e.preventDefault();
                setErrorFor(namn, 'Must be filled!');
                
            }
            if(emailValue === "" ) { 
                e.preventDefault();
                setErrorFor(email, 'Must be filled!');
            }
            else if (!isEmail(emailValue)){
                setErrorFor(email, 'E-post är inte giltig');
            }
            if(mnumerValue === "" ) { 
                e.preventDefault();
                setErrorFor(mnumer, 'Must be filled!');
            }
            if(datumValue === "" ) { 
                e.preventDefault();
                setErrorFor(datum, 'Must be filled!');
            }
            if(tidValue === "" ) { 
                e.preventDefault();
                setErrorFor(tid, 'Must be filled!');
            }
        
        }
    
        function setErrorFor() {
            let formError = document.getElementById('errormsg');   
            formError.innerHTML = "Must be filled!";
        }

        function isEmail(email) {
            return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z])$/.test(email);
        }
    });
    
   
}
