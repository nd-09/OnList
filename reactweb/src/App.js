import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Signup' element ={<SignUp/>}/>
      <Route path='/' element ={<SignIn/>}/>
      <Route path='/dashboard' element ={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    );
}

export default App;
