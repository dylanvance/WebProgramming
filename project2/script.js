/* 
* script.js used for form validation on project2/index.html
* author: Dylan Vance
*/


/* 
* Determines if the given value's length is equal to the given length.
* Parameters: value, length
* Return: bool
*/
function testLength(value, length) {
    if (value.length == length) {
        return true;
    }
    else {
        return false;
    }
}


/* 
* Determines if the given value is a number.
* Parameters: value
* Return: bool
*/
function testNumber(value) {
    return !isNaN(value);
}


/* 
* Validates the first name, last name, card name, and CVC fields.
* Handles the alert and prevent.
* Parameters: control, name
* Return: bool (not used)
*/
function validateControl(control, name) {
    switch(name) {
        case 'first_name':
            if (testNumber(control.value)) {
                alert("First Name cannot be a number.");
                Event.preventDefault();
                return false;
            }
            break;
        case 'last_name':
            if (testNumber(control.value)) {
                alert("Last Name cannot be a number.");
                Event.preventDefault();
                return false;
            }
            break;
        case 'card_name':
            if (testNumber(control.value)) {
                alert("Name on Card cannot be a number.");
                Event.preventDefault();
                return false;
            }
            break;
        case 'cvc':
            if (!testNumber(control.value)) {
                alert("CVV2/CVC must be a number.");
                Event.preventDefault();
                return false;
            }
            break;
        default:
            alert("Error in validateControl()");
            return false;
    }

    return true;
}


/* 
* Validates the credit card number.
* Tests the length of the card as either 15 (AmEx) or 16 (Discover, MasterCard, Visa).
* Handles the alert and prevent.
* Parameters: value
* Return: bool (not used)
*/
function validateCreditCard(value) {
    value = value.replace(/\s/g, "");   // replace spaces with ""

    if (!testNumber(value)) {
        alert("Card Number must be a number")
        Event.preventDefault();
        return false;
    }

    switch (value[0]) {
        case '3':
            if (!testLength(value, 15)) {
                alert("Card Number must be 15 digits long")
                return false;
            }
            break;
        case '6':
        case '5':
        case '4':
            if (!testLength(value, 16)) {
                alert("Card Number must be 16 digits long")
                return false;
            }
            break;
        default:
            alert("Not a valid Card Number");
            Event.preventDefault();
            return false;
    }

    return true;
}


/* 
* Validates the expiration date of the card.
* Handles the alert and prevent.
* Parameters: value
* Return: bool (not used)
*/
function validateDate(value) {
    // YEAR-MONTH
    let dateString = value.split("-");
    let year = parseInt(dateString[0]);
    let month = parseInt(dateString[1]);

    // credit cards expire at the END of the month
    // so we set the date to the first of the following month
    // normally we would want to do month - 1 because months are 0-11 in JS
    let inputDate = new Date(year, month, 1);
    let currentDate = new Date();

    if (inputDate <= currentDate) {
        alert("Card is expired");
        Event.preventDefault();
        return false;
    }
    
    return true;
}


/* 
* Validates the email using a regex.
* Does not handle the alert or prevent.
* Parameters: value
* Return: bool
*/
function validateEmail(value) {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
}


/* 
* Checks if one of the car type radio buttons is checked.
* Does not handle the alert or prevent.
* Parameters: control
* Return: bool
*/
function validateCarType(control) {
    for (let i = 0; i < control.length; i++) {      // iterate through buttons
        if (control[i].checked) {                   // determine if one is checked
            return true;
        }
    }
    return false;
}


/* 
* Checks if the default "select" value is selected for state dropdown
* Does not handle the alert or prevent.
* Parameters: value
* Return: bool
*/
function validateState(value) {
    if (value === 'select') {
        return false;
    }
    else {
        return true;
    }
}


/* 
* Validates the pickup time to ensure it is not in the past.
* Handles the alert and prevent.
* Parameters: value
* Return: bool (not used)
*/
function validateDateTime(value) {
    let inputDate = new Date(value);
    let currentDate = new Date();

    if (inputDate < currentDate) {
        alert("Invalid pickup time");
        Event.preventDefault();
        return false;
    }
    
    return true;
}


/* 
* Validates that the drop off time is not before the pickup time.
* Handles the alert and prevent.
* Parameters: pickUpTime, dropOffTime
* Return: bool (not used)
*/
function validateDropOffTime(pickUpTime, dropOffTime) {
    let pickupDate = new Date(pickUpTime);
    let dropOffDate = new Date(dropOffTime);

    if (pickupDate > dropOffDate) {
        alert("Drop off date must be after pickup date");
        Event.preventDefault();
        return false;
    }

    return true;
}


/* 
* Calls all validation functions and passes appropriate parameters.
* This function is called onSubmit of the form.
* Parameters: none
* Return: none
*/
function validateForm() {
    
    // Validate First Name
    validateControl(document.getElementById("first_name"), "first_name");

    // Validate Last Name
    validateControl(document.getElementById("last_name"), "last_name");

    // Validate Name on Card
    validateControl(document.getElementById("card_name"), "card_name");

    // Validate CVC
    validateControl(document.getElementById("cvc"), "cvc");

    // Validate Card Number
    validateCreditCard(document.getElementById("card_num").value);

    // Validate Expiration Date
    validateDate(document.getElementById("expire_date").value);

    // Validate Email
    emailTest = validateEmail(document.getElementById("email").value);
    if (!emailTest) {
        alert("Invalid Email");
        Event.preventDefault();
    }

    // Validate Car Type
    carTypeTest = validateCarType(document.getElementsByName("car_type"));
    if (!carTypeTest) {
        alert("Please select a car type");
        Event.preventDefault();
    }

    // Validate Pickup State
    pickupStateTest = validateState(document.getElementById("pickup_state").value);
    if (!pickupStateTest) {
        alert("Please select a pickup state");
        Event.preventDefault();
    }

    // Validate Drop Off State
    dropStateTest = validateState(document.getElementById("drop_state").value);
    if (!dropStateTest) {
        alert("Please select a drop off state");
        Event.preventDefault();
    }

    // Validate Pickup Time
    validateDateTime(document.getElementById("pickup_time").value);

    // Validate Drop Off Time
    validateDropOffTime(document.getElementById("pickup_time").value, document.getElementById("drop_time").value);

}
