function validateForm() {
    let format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    if(document.getElementById("emailPc").value.match(format)){
        alert("Email cannot contain one of the entered characters")
    }
    else{
    $("#bookPc").hide();
    $("#pcBookedButton").hide();
    $("#bookPcText").hide();
    document.getElementById("BookPcPlace").innerHTML = "Tack för din bokning";
    }
    let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        $('#datePc').attr('min',today);
}
