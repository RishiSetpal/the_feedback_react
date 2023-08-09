import React, { useState } from 'react';
// import {app} from "../../Firebase/FbConfig";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    emailId: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const nav = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
    const validationErrors = validateFormData({
      ...formData,
      [name]: event.target.value,
    });
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
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formData.emailId, formData.password)
        .then((res)=> {
            console.log('res: ', res);            
            if (res.user != null){
                sendEmailVerification(res.user);

                // Firebase basics
                // https://chat.openai.com/share/c3335c1c-61a9-4973-86df-c0d765fb052c
                const db = getDatabase();
                const sanitizedNodeName = formData.emailId.replace(/[@.]/g, (match) => (match === "@" ? "_at_" : "_dot_"));
                
                // Now use the sanitizedNodeName as the key when writing to the database
                // firebase.database().ref("users/" + sanitizedNodeName).set({ /* Your data here */ });
                // firebase.database().ref("users").push({ /* Your data here */ }); // this will create its own Node Name.

                const usersRef = ref(db, 'users/'+ sanitizedNodeName+'/');
                const userData = {
                  userName: formData.userName,
                  emailId: formData.emailId,
                  phone: formData.phone,
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                };
                // push(usersRef, userData)
                // push will will push inside the email one node (so Prob, there might me multiple nodes) (&  Prob2, node name is random)
                // So, Sol will use set 
                // set(usersRef, userData)
                set(usersRef, userData)
                  .then(() => {
                    console.log('User details stored in Realtime Database');
                  })
                  .catch((error) => {
                    console.error('Error storing user details:', error);
                  });
            }
            nav("/login");
        })
        .catch(err=> {
          console.log('err: '+JSON.stringify(err));
          if (err.code === 'auth/email-already-in-use') {
            alert("Authentication Failure: Email Id already in use.");
          }
          else {
            alert("Erro: "+err.code);
          }
        });

    } else {
      // Form has errors, update the state with the errors
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    let errors = {};

    if (!data.userName) {
      errors.userName = 'Name is required';
    } else if (data.userName.trim().length < 2) {
      errors.userName = 'Please enter a valid User Name with at least 2 characters';
    } else if (!data.userName.match(/^[a-zA-Z ]+$/)) {
      errors.userName = 'User Name should contain alphanumeric characters only';
    }

    if (!data.emailId) {
      errors.emailId = 'Email is required';
    } else if (!isValidEmail(data.emailId)) {
      errors.emailId = 'Invalid Email Id format';
    }

    if (!data.phone) {
      errors.phone = 'Phone no. is required';
    } else if (data.phone.toString().trim().length !== 10) {
      errors.phone = 'Please enter a valid phone no. of 10 digits';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!data.password.match(/[a-z]/g) || !data.password.match(/[A-Z]/g) || !data.password.match(/[0-9]/g) ) {
        errors.password = 'Invalid password';
    } else if (data.password.trim().length < 8) {
      errors.password = 'Password should contain at least 8 characters';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isValidEmail = (emailId) => {
    // A simple emailId validation regex (not the most comprehensive one)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailId);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container centered-content">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User Name:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              onFocus={handleBlur}
              onBlur={handleBlur}
              required
            />
            {errors.userName && <span className="error-text">{errors.userName}</span>}
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
              onFocus={handleBlur}
              onBlur={handleBlur}
              required
            />
            {errors.emailId && <span className="error-text">{errors.emailId}</span>}
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
              onFocus={handleBlur}
              onBlur={handleBlur}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type={showPassword ? 'text' : 'password'}
              id="psw"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleBlur}
              onBlur={handleBlur}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
            <span className="eye-icon" onClick={toggleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </span>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </label>
        </div>
        <div className="passwordValidationMessage"  style={{ display: errors.password && formData.password.length > 0 ? 'block' : 'none' }}>
          <h3>Password must contain the following:</h3>
          <p className={formData.password.match(/[a-z]/g) ? 'valid' : 'invalid'}>
            A lowercase letter
          </p>
          <p className={formData.password.match(/[A-Z]/g) ? 'valid' : 'invalid'}>
            A capital (uppercase) letter
          </p>
          <p className={formData.password.match(/[0-9]/g) ? 'valid' : 'invalid'}>
            A number
          </p>
          <p className={formData.password.length >= 8 ? 'valid' : 'invalid'}>
            Minimum 8 characters
          </p>
        </div>

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUpForm;
