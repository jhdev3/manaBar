function validateForm(info) {
    // Prevents option to use past date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $('#datePc').attr('min',today);
    // Prevents invalid characters for email form
    let format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    if(document.getElementById("emailPc").value.match(format)){
        alert("Email cannot contain one of the entered characters")
        return false;
    }
    
    // If a form is empty
    let a = document.forms["bookPc"]["name"].value;
    let b = document.forms["bookPc"]["email"].value;
    let c = document.forms["bookPc"]["number"].value;
    let d = document.forms["bookPc"]["date"].value;
    let e = document.forms["bookPc"]["time"].value;
    if(!a || !b || !c || !d || !e){
        alert("Pleasea fill out all fields")
    }
    else{
        $("#bookPc").hide();
        $("#pcBookedButton").hide();
        $("#bookPcText").hide();
        document.getElementById("BookPcPlace").innerHTML = "Tack för din bokning";
        }
        console.log(JSON.stringify({name: a, email: b, number: c, date: d, time: e}))
}
function newBooking(){
    document.getElementById("bookPc").reset();
    $("#bookPc").show()
    $("#pcBookedButton").show()
}
