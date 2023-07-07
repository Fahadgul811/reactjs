
import './App.css';
import {Route,Routes} from "react-router-dom";
import Signin from './components/Signin';
import HomeContainer from './components/HomeContainer';

function App() {
  return (
    <>
   
    <Routes>
    <Route exact path="/*"element={ <Signin/>}/>
    <Route path='HomeContainer'element={<HomeContainer/>}/>
   </Routes>
   
    </>
  );
}

export default App;
