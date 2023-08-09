import NavBar from "./Navbar/NavBar.js";
import { useState, useEffect, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import {app} from "../../Firebase/FbConfig.js";
// import StudentFormDataBinder from "./StudentFormDataBinder.js";

export default function LoginForm(){
    
    const nav = useNavigate();
    const [emaild, setEmaild] = useState("");
    const [password, setPassword] = useState("");

    const hEmaild = (event) => { setEmaild(event.target.value); }
    const hPassword = (event) => { setPassword(event.target.value); }

    useEffect( () => {
        // let name = localStorage.getItem("un");
        // let name = StudentFormDataBinder.getStudentName();
        // if (name!==null){
        //     nav("/feedback");
        // }
    }, []);

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emaild, password)
        .then((res)=>{
            if (res.user.emailVerified){
                localStorage.setItem("un", emaild);
                // StudentFormDataBinder.setStudentName(emaild);
                nav("/feedback");
            } else {
                alert("User is not verified")
            } 
        })
        .catch((err)=>{
            alert("Issue: " + err)
        });

    }

    return(
        <>
        <center>
            <NavBar/>
            <h1>Login Page</h1>
            <form onSubmit={check}>
                <input type="text" placeholder={"Enter Email Id:"} onChange={hEmaild} value={emaild}/> <br /><br />
                <input type="password" placeholder={"Enter Password:"} onChange={hPassword} value={password}/><br/><br />
                <input type="submit" value="Login" />
            </form>
        </center>
        </>
    );
}