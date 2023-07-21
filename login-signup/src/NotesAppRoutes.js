import { React } from "react";
import { Route, Routes} from "react-router-dom";
import Signin from "./components/Registration/Signin";
import HomeContainer from "./components/home/HomeContainer";
import Protected from "./components/Registration/Protected";
import { AuthProvider } from "./Authentication/AuthProvider";



const NotesAppRoutes = () => 
<AuthProvider>
  <Routes>

    <Route path="HomeContainer" element={<Protected>
      <HomeContainer />
      </Protected>}/>

      <Route path="/*" element={<Signin/>}/>
  </Routes>
  </AuthProvider>
export default NotesAppRoutes;
