import React from 'react';
import Header from '../Header';
import Welcome from '../Welcome';
import Landing from '../Landing';
import Login from '../Login';
import SignUp from '../SignUp';
import ForgetPassword from '../ForgetPassword';
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../App.css';
import { IconContext } from "react-icons";

function App() {
  return (
    <div className="App">
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Header />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>

          <Footer />
        </IconContext.Provider>
      </Router>
      
    </div>
  );
}

export default App;
