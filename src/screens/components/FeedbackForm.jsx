import React, { useState, useEffect, useContext } from 'react';
import NavBar from './Navbar/NavBar';
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { db } from '../../Firebase/FbConfig';
import emailjs from "@emailjs/browser";
// Email using nodejsmailer

const emojiOptions = [
  { label: '😡', value: 'angry' },
  { label: '😕', value: 'sad' },
  { label: '😐', value: 'neutral' },
  { label: '😊', value: 'happy' },
  { label: '😄', value: 'excited' },
];

const FeedbackForm = () => {

  const nav = useNavigate();
  const [emailId, setEmailId] = useState("");

  const hEmailId = (event) => { setEmailId(event.target.value); }

  const [selectedRating, setSelectedRating] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect( () => {
    let name = localStorage.getItem("un");
    // let emailId = StudentFormDataBinder.getStudentName();
    if (name!==null){
      setEmailId(name);
    } else {
      nav("/login");
    }
  }, []);

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("un");
    // StudentFormDataBinder.setStudentName(null);
    nav("/login");
  }

  const delUser = (event) => {
    event.preventDefault();

    if(window.confirm('Are you you want to Delete user?')){
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user)
      .then(() => {
        localStorage.removeItem("un");
        // StudentFormDataBinder.setStudentName(null);
        nav("/login");
      })
      .catch((err) => {alert("Error: " + err);})
    }

  }

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackMessage(event.target.value);
  };

  const resetEmailPassword = (event) => {
      event.preventDefault();
      const auth = getAuth();
      sendPasswordResetEmail(auth, emailId)
      .then((res)=>{
          nav("/login");
      })
      .catch((err)=>{
          alert("Issue: " + err);
      });

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can implement the code to send the feedback to the server here
    console.log('Rating:', selectedRating);
    console.log('Feedback:', feedbackMessage);

    // const db = getDatabase();
    // console.log('db: ', db);
    const sanitizedNodeName = emailId.replace(/[@.]/g, (match) => (match === "@" ? "_at_" : "_dot_"));
    console.log('sanitizedNodeName: ', sanitizedNodeName);
    const data = { emailId, 'Rating':selectedRating, 'Feedback':feedbackMessage }
    // db.database().ref("visitors/"+sanitizedNodeName).set(data);
    console.log('data: ', data);
    console.log('set: ', set);
    // set( ref(db, "visitors/"+sanitizedNodeName), data); // this helped to add only one Feeback node to email node
    // push( ref(db, "visitors/"+sanitizedNodeName), data);  // this helped to push many Feeback node to email node (but with random Node name)
    // Sol. // set(ref(db, "visitors/"+sanitizedNodeName+"/"+new Date()),data);
    // this helped to set many Feeback node to email node (but with newDate() as Node name)

    set(
        ref(db, "visitors/"+sanitizedNodeName+"/"+new Date()),
        data
    ).then((res) =>{
        console.log(JSON.stringify(res));
        alert("Feedback has been saved and sent to the Admin");
        
        console.log("calling sendMail");
        // sendMail();
        
    }).catch(err => console.log("err: "+err));

    // Reset the form after submitting
    setSelectedRating('');
    setFeedbackMessage('');
  };

  const sendMail = async() => {
        console.log("Inside sendMail")
        const email_Id = "service_qeevlwd";
        const templateId = "template_6lzfdbc";
        const publicKey = "8ZUMk1kASggUB_-FZ";
        let message = "Hello, \n my name is "+ emailId +' Rating: '+selectedRating+' Feedback: '+feedbackMessage;
        let data = {emailId, message};
        console.log("Before sending sendMail");
        await emailjs.send(email_Id, templateId, data, publicKey)
        .then( res=>{
                alert("Mail sent"+JSON.stringify(res));
                
            })
        .catch( err=>alert("Error sending email:"+JSON.stringify(err)));
        // window.location.reload();
    }

  return (
    <div>
      <NavBar/>
      <h1 className="heading">Creative Feedback Form</h1>
      <h2>"Welcome: "{emailId}</h2>
      <form onSubmit={logout}>
          <input type="submit" value="Logout" />
      </form>
      <form onSubmit={delUser}>
          <input type="submit" value="Delete" />
      </form>
      <form onSubmit={resetEmailPassword}>
          <input type="text" placeholder={"Re-Enter UserName:"} onChange={hEmailId} value={emailId}/> <br /><br />
          <input type="submit" value="Reset" />
      </form>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="emoji-container">
          {emojiOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={selectedRating === option.value}
                onChange={() => handleRatingChange(option.value)}
              />
              <span role="img" aria-label={option.label}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
        <textarea
          placeholder="Share your creative feedback here..."
          value={feedbackMessage}
          onChange={handleFeedbackChange}
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;