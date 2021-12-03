function validateForm()
{
    if(document.getElementById("namePc").value.length == 0){
        alert("Name cannot be empty")
    }
    if(document.getElementById("emailPc").value.length == 0){
        alert("Email cannot be empty")
    }
    if(document.getElementById("numberPc").value.length == 0){
        alert("Number cannot be empty")
    }
    if(document.getElementById("datePc").value.length == 0){
        alert("Date cannot be empty")
    }
    if(document.getElementById("timePc").value.length == 0){
        alert("Time cannot be empty")
    }
    else{
    $("#bookPc").hide();
    }
}
