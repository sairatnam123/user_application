document.addEventListener('DOMContentLoaded', function () {
    const firstNameInput =document.getElementById("firstName");
    const firstNameError = document.getElementById('firstNameError');
            // Listen for user input in the first name field
    firstNameInput.addEventListener('input', function() {
        const firstName = firstNameInput.value;
        if (firstName.length < 3) {
            firstNameInput.classList.add('invalid');
            firstNameInput.classList.remove('valid');
            firstNameError.classList.add('active');
            firstNameError.textContent="First name must be at least 3 characters long"
        }
        else if(firstName.length > 25) {
            firstNameInput.classList.add('invalid');
            firstNameInput.classList.remove('valid');
            firstNameError.classList.add('active');
            firstNameError.textContent="First name should not contain more than 25 charecters";
        }
        else if(firstName.includes(" ")){
            firstNameInput.classList.add('invalid');
            firstNameInput.classList.remove('valid');
            firstNameError.classList.add('active');
            firstNameError.textContent="First name should not contain spaces";
        }
        else if (!/^[a-zA-Z]+$/.test(firstName)) {
            firstNameInput.classList.add('invalid');
            firstNameInput.classList.remove('valid');
            firstNameError.classList.add('active');
            firstNameError.textContent="Last name contains only alphabets";
        }
         else {
                firstNameInput.classList.add('valid');
                firstNameInput.classList.remove('invalid');
                firstNameError.classList.remove('active');
                firstNameError.textContent=""
        }
        });
const lastNameInput =document.getElementById("lastName");
const lastNameError= document.getElementById("lastNameError");
lastNameInput.addEventListener('input', function() {
        const lastName = lastNameInput.value;
        if (lastName.length <= 3) {
            lastNameInput.classList.add('invalid');
            lastNameInput.classList.remove('valid');
            lastNameError.classList.add('active');
            lastNameError.textContent="Last name must be at least 3 characters long"
        }
        else if(lastName.length > 25) {
            lastNameInput.classList.add('invalid');
            lastNameInput.classList.remove('valid');
            lastNameError.classList.add('active');
            lastNameError.textContent="Last name should not contain more than 25 charecters";
        }
        else if(lastName.includes(" ")){
            lastNameInput.classList.add('invalid');
            lastNameInput.classList.remove('valid');
            lastNameError.classList.add('active');
            lastNameError.textContent="Last name should not contain spaces";
        }
        else if (!/^[a-zA-Z]+$/.test(lastName)) {
            lastNameInput.classList.add('invalid');
            lastNameInput.classList.remove('valid');
            lastNameError.classList.add('active');
            lastNameError.textContent="Last name contains only alphabets";
        }
         else {
                lastNameInput.classList.add('valid');
                lastNameInput.classList.remove('invalid');
                lastNameError.classList.remove('active');
                lastNameError.textContent=""
        }
        });
    const phoneInput=document.getElementById("phoneNumber"); 
    const phoneError = document.getElementById("phoneNumberError");
    phoneInput.addEventListener('input', function() {
        const phone = phoneInput.value;
        const phonePattern = /^[6789][0-9]{9}$/;
        if (phone === "") {
            phoneInput.classList.add('invalid');
            phoneInput.classList.remove('valid');
            phoneError.classList.add('active');
            phoneError.textContent = "Phone number cannot be empty.";
        } else if (!/^\d+$/.test(phone)) {
            phoneInput.classList.add('invalid');
            phoneInput.classList.remove('valid');
            phoneError.classList.add('active');
            phoneError.textContent = "Phone number must contain only digits.";
        } else if (phone.length !== 10) {
            phoneInput.classList.add('invalid');
            phoneInput.classList.remove('valid');
            phoneError.classList.add('active');
            phoneError.textContent = "Phone number must be 10 digits long.";
        } else if (!phonePattern.test(phone)) {
            phoneInput.classList.add('invalid');
            phoneInput.classList.remove('valid');
            phoneError.classList.add('active');
            phoneError.textContent = "Phone number must start with 9, 7, 6, or 8.";
        } else {
            phoneInput.classList.add('valid');
            phoneInput.classList.remove('invalid');
            phoneError.classList.remove('active');
            phoneError.textContent=""
        }
        });
    var emailError = document.getElementById("EmailError");
    const emailInput =document.getElementById("email"); 
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailInput.addEventListener('input', function() {
                const email = emailInput.value;
                if (email === "") {
                    emailInput.classList.add('invalid');
                    emailInput.classList.remove('valid');
                    emailError.classList.add('active');
                    emailError.textContent = "Email field cannot be empty.";
                } else if (!email.includes("@")) {
                    emailInput.classList.add('invalid');
                    emailInput.classList.remove('valid');
                    emailError.classList.add('active');
                    emailError.textContent = "Email must contain '@'.";
                } else if (!email.includes(".")) {
                    emailInput.classList.add('invalid');
                    emailInput.classList.remove('valid');
                    emailError.classList.add('active');
                    emailError.textContent = "Email must contain a '.' character.";
                } else if (!emailPattern.test(email)) {
                    emailInput.classList.add('invalid');
                    emailInput.classList.remove('valid');
                    emailError.classList.add('active');
                    emailError.textContent = "Invalid email format.";
                } else {
                    emailInput.classList.add('valid');
                    emailInput.classList.remove('invalid');
                    emailError.classList.remove('active');
                    emailError.textContent = ""
                }
            })
       
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the page from refreshing

            const formData = new FormData(form);
            fetch('/submit', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                } else {
                    alert('Form submission failed.');
                }
            });
        });
    } else {
        console.error('Form not found.');
    }
});


    
function validateForm() {
    // Get the value of the input field with name "firstName"
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    // Check if the first name is empty
    if (firstName === "") {
        alert("First name must be filled out");
        return false; 
    }
    else if (lastName === "") {
        alert("last name must be filled out");
        return false; 
    }
    // If all validations pass, the form will be submitted
    return true;
}
