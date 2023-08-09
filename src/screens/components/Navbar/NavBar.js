
import { Link } from 'react-router-dom';
// import StudentFormDataBinder from "./StudentFormDataBinder.js";

export default function NavBar(){

    const userName = localStorage.getItem('un');
    // let userName = StudentFormDataBinder.getStudentName();

    return(
        <>
        <center>
            <div className="nav">
                {
                    (userName == null) ?
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                            {/* <Link to="/fp">Forgot Password</Link> */}
                        </>
                    :
                        <>
                            {/* <Link to="/">Home</Link> */}
                            {/* <Link to="/about">About</Link> */}
                            {/* <Link to="/cp">Change Password</Link> */}
                        </>

                }
            </div>
        </center>
        </>
    );
}