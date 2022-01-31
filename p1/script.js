/* 
const and let are two new methods for creating variable instead of var in ES6 or advanced JS.
const is constant variable cannot be changed later once assigned to any value.
while let can be changed later 
*/  
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// ALL FUNCTIONS:

function showError (input,message) {
    const parent =input.parentElement; //make variable to update class of input's parent element i.e. form-control
    parent.className="form-control error"; //updates class
    const child = parent.querySelector("small"); //for child element of parent's element OR sibbling element of input's element
    //.querySelector("") gets the first element in the document specified in ("")
    child.innerText= message; //update error message
}

function showSuccess (input) {
    const parent =input.parentElement; //make variable to update class of input's parent element i.e. form-control
    parent.className="form-control success"; //updates class
}
/* BEFORE REFACTORING USING THIS FUNCTION
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
*/
// Function to check input fields required values
function checkRequired (inputFields){
    inputFields.forEach(function(input,index) { // array.forEach(function(currentValue,index,arr)) FOR EACH loop is high order array method
        if (input.value ===''){
            showError(input,`${getFieldId(input)} is required`); //Template literals are string literals allowing embedded expressions enclosed in back tick ``.
            if(index===3){
                showError(input,"Re-enter Password"); // for confirm password
            }
        }
        else{
            showSuccess(input);
        }
    });
}
// Function to check length of username and password input fields
function checkLength (input,a,b){
    if (input.value.length < a) showError(input,`${getFieldId(input)} must be at least ${a} characters`);
    if (input.value.length > b) showError(input,`${getFieldId(input)} must be at less than ${b+1} characters`);
}
// Fuction to validate email
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) showError(input,"Invalid Email")
}
// Function to get id of input fields in proper case
function getFieldId(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    //console.log(username.id);

    checkRequired ([username,email,password,password2]);
    if (username.value!=="") checkLength(username,3,6);
    if (password.value!=="") checkLength(password,5,10);
    if (email.value!=="") checkEmail(email);
    if (password2.value!=="") if (password.value!==password2.value) showError(password2,"Confirm Password doesnot match");

})
/*
          RE-FACTOR THIS IF ELSE CODE WITH CHECK REQUIRED FUNCTION BECAUSE OF CODE UGLYNESS & REPEATATIVE WORK  

    if (username.value==='') {
        showError (username,"Username is required");
    }
    else{
        showSuccess(username);
    }
    if (email.value==='') {
        showError (email,"Email is required");
    }
    else if (!validateEmail(email.value)){
        showError(email,"Invalid Email");
    }
    else{
        showSuccess(email);
    }
    if (password.value==='') {
        showError (password,"Password is required");
    }
    else{
        showSuccess(password);
    }
    if (password2.value==='') {
        showError (password2,"Re-Enter Password");
    }
    else{
        showSuccess(password2);
    }
*/
