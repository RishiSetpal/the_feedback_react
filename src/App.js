import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ValidationSchemaExample } from './screens/components/ValidationSchemaExample';
import SignUpForm from './screens/components/SignUpForm';
import LoginForm from './screens/components/LoginForm';
import FeedbackForm from './screens/components/FeedbackForm.jsx';
import AdminLoginForm from './screens/components/AdminLoginForm.jsx';
import AdminDashboard from './screens/components/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ValidationSchemaExample></ValidationSchemaExample>}></Route> */}
          <Route path="/" element={<SignUpForm></SignUpForm>}></Route>
          <Route path="/signup" element={<SignUpForm></SignUpForm>}></Route>
          <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          <Route path="/feedback" element={<FeedbackForm></FeedbackForm>}></Route>
          <Route path="/adminlogin" element={<AdminLoginForm></AdminLoginForm>}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path="*" element={<FeedbackForm></FeedbackForm>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Firebase Deployment:

// npm install firebase-tools -g
// firebase login
// firebase init

// Select Hosting: Configure and deploy Firebase Hosting sites.
// Select Use an existing project
// Select your Firebase Project
// build
// single-page app: y (Yes)
// N

// firebase deploy