import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';


const SignUpForm = () => {
    const [formData, setFormData] = useState(() => {
        return {
            userName: '',
            emailId: '',
            phone: '',
            password: '',
            confirmPassword: '',
        }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
        handleBlur(event);
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        const validationErrors = validateFormData({ ...formData, [name]: event.target.value });
        setErrors({
        ...errors,
        [name]: validationErrors[name],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
        // Form is valid, submit data or perform actions
        console.log('Form data:', formData);
        } else {
        // Form has errors, update the state with the errors
        setErrors(validationErrors);
        }
    };

    const validateFormData = (data) => {
        let errors = {};

        if (!data.userName) {
            errors.userName = 'Name is required';
        } else if (data.userName.toString().trim().length<2) {
            errors.userName = "Please enter a valid User Name atleast 2 characters";
        }else if (! data.userName.match(/^[a-zA-Z ]+$/)){  //.match('[a-zA-Z ]+')
            errors.userName = "User Name should contain alphanumeric characters only";
        }

        if (!data.emailId) {
            errors.emailId = 'Email is required';
        } else if (!isValidEmail(data.emailId)) {
            errors.emailId = 'Invalid Email Id format';
        }

        if (!data.phone) {
            errors.phone = 'Phone no. is required';
        } else if (data.phone.toString().trim().length !== 10){
            errors.phone = "Please enter a valid phone no. of 10 digits";
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.trim().length<8){
            errors.password = "Password should contain atlest 8 characters";
        }


        var myInput = document.getElementById("psw");
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");


        // When the user clicks on the password field, show the message box
        myInput.onfocus = function() {
        document.getElementById("message").style.display = "block";
        }

        // When the user clicks outside of the password field, hide the message box
        myInput.onblur = function() {
        document.getElementById("message").style.display = "none";
        }

        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(data.password.match(lowerCaseLetters)) {  
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }
        
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(data.password.match(upperCaseLetters)) {  
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(data.password.match(numbers)) {  
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
        
        // Validate length
        if(data.password.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }

        return errors;
    };

    const isValidEmail = (emailId) => {
        // A simple emailId validation regex (not the most comprehensive one)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailId);
    };

    return (
        <div class="container centered-content">

            <form onSubmit={handleSubmit}>
            <div>
                <label>
                User Name:
                <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.userName && <span>{errors.userName}</span>}
                </label>
            </div>
            <div>
                <label>
                Email Id:
                <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.emailId && <span>{errors.emailId}</span>}
                </label>
            </div>
            <div>
                <label>
                Phone:
                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.phone && <span>{errors.phone}</span>}
                </label>
            </div>
            <div>
                <label>
                Password:
                <input
                    type="password"
                    id='psw'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleBlur}
                    onBlur={handleBlur}
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
                {errors.password && <span>{errors.password}</span>}
                </label>
                <div id="message">
                    <h3>Password must contain the following:</h3>
                    <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                    <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                    <p id="number" class="invalid">A <b>number</b></p>
                    <p id="length" class="invalid">Minimum <b>8 characters</b></p>
                </div>
            </div>
            <input type="submit" value="Sign Up"/>
            </form>
        </div>
    );
};

export default SignUpForm;
