import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          firstName:
          <Field name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null} <br />
          lastName:
          <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null} <br />
          email:
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null} <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

// import React from 'react'
// import axios from 'axios';
// import { useFormik } from 'formik';

// export default function SignUpForm() {

//     const initialValues = {
//         userName: '',
//         emailId: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//     };

//     const validate = (values) => {
//         let errors = {};

//         if (values.userName.trim().length < 2){
//             errors.userName = "Please enter a valid userName atleast 2 characters";
//         }else if (! values.userName.match(/^[a-zA-Z ]+$/)){  //.match('[a-zA-Z ]+')
//             errors.userName = "userName should contain alphanumeric characters only";
//         }

//         if (!values.email) {
//             errors.email = 'Required';
//         } else if (values.userName.trim() = 0) {
//             errors.email = 'Email should not contain Spaces';
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//             errors.email = 'Invalid email address';
//         }

//         if (values.phone.toString().trim().length !== 10){
//             errors.phone = "Please enter a valid phone no. 10 numbers";
//         }

//         if (values.password.trim().length<8){
//             errors.query = "query should contain atlest 8 characters";
//         }
        
//         return errors;
//     }

//     const onSubmit = (values, {resetForm}) => {
//         let data = {"userName": values.userName, "phone": values.phone, "query": values.query};
//         let url = "http://localhost:9999/save";
//         // let url = "https://js-enquery-application-backend.vercel.app/save";
//         // let url = "https://js-enquery-application-backend-git-main-rishisetpal.vercel.app/save";
        
//         axios.post(url, data)
//         .then(response=>{
//             console.log('response: ', response);

//             alert("Record Mailed! Will get back to you!");
//             resetForm();
//         })
//         .catch(err=>{console.log(err);});
//     }

//     const formik = useFormik({initialValues, validate, onSubmit});



//   return (
//     <div>SignUpForm</div>
//   )
// }


// import React, { useState } from 'react'
// import axios from 'axios';
// import { useFormik } from 'formik';

// export default function SignUpForm() {

//     const [userName, setUserName] = useState(() => {return {value:'', error:null}});
//     const [emailId, setEmailId] = useState(() => '');
//     const [phone, setPhone ] = useState(() => null);
//     const [password, setPassword] = useState(() => '');
//     const [confirmPassword, setConfirmPassword] = useState(() => '');

//     const hName = (event) => {
//         setUserName((prev) => {
//             return event.target.value;
//         })
//     }

//     // const validate = (values) => {
//     //     let errors = {};

//     //     if (values.userName.trim().length < 2){
//     //         errors.userName = "Please enter a valid userName atleast 2 characters";
//     //     }else if (! values.userName.match(/^[a-zA-Z ]+$/)){  //.match('[a-zA-Z ]+')
//     //         errors.userName = "userName should contain alphanumeric characters only";
//     //     }

//     //     if (!values.email) {
//     //         errors.email = 'Required';
//     //     } else if (values.userName.trim() = 0) {
//     //         errors.email = 'Email should not contain Spaces';
//     //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     //         errors.email = 'Invalid email address';
//     //     }

//     //     if (values.phone.toString().trim().length !== 10){
//     //         errors.phone = "Please enter a valid phone no. 10 numbers";
//     //     }

//     //     if (values.password.trim().length<8){
//     //         errors.query = "query should contain atlest 8 characters";
//     //     }
        
//     //     return errors;
//     // }

//     // const onSubmit = (values, {resetForm}) => {
//     //     let data = {"userName": values.userName, "phone": values.phone, "query": values.query};
//     //     let url = "http://localhost:9999/save";
//     //     // let url = "https://js-enquery-application-backend.vercel.app/save";
//     //     // let url = "https://js-enquery-application-backend-git-main-rishisetpal.vercel.app/save";
        
//     //     axios.post(url, data)
//     //     .then(response=>{
//     //         console.log('response: ', response);

//     //         alert("Record Mailed! Will get back to you!");
//     //         resetForm();
//     //     })
//     //     .catch(err=>{console.log(err);});
//     // }

//     // const formik = useFormik({initialValues, validate, onSubmit});



//   return (
//     <center>
//         <div>
//             <h1>SignUp Page</h1>
//         </div>
//     </center>
//   )
// }
