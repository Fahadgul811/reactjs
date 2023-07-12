
import './App.css';
import {Route,Routes} from "react-router-dom";
import Signin from './components/Signin';
import HomeContainer from './components/HomeContainer';
import Protected from './components/Protected';
import SigninForm from './components/SigninForm';
import { React, useState } from 'react';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const onLoggedIn = (value) => {
    setisLoggedIn(value)
  }

  

  return (
    <>
   {isLoggedIn === false && <Signin onLoggedIn={onLoggedIn}/>}
    <Routes>
    <Route exact path="/*"element={ <Signin/>}/>
    <Route path='HomeContainer' element={
           <Protected isLoggedIn={isLoggedIn}>
             <HomeContainer />
           </Protected>
         }/>
   </Routes>
   
    </>
  );
}

export default App;
