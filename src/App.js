import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ValidationSchemaExample } from './screens/components/ValidationSchemaExample';
import SignUpForm from './screens/components/SignUpForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ValidationSchemaExample></ValidationSchemaExample>}></Route> */}
          <Route path="/" element={<SignUpForm></SignUpForm>}></Route>
          <Route path="/signup" element={<SignUpForm></SignUpForm>}></Route>
          {/* <Route path="/login" element={<LoginForm></LoginForm>}></Route>
          <Route path="*" element={<ClinetDashboard></ClinetDashboard>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;