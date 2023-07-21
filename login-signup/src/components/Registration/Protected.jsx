import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Authentication/AuthContext";



const Protected = ({ children }) => {
  
  const { user } = useContext(AuthContext);

  if (user !== null) {
    return children;
  }
  return <Navigate to="/" replace />;

};
export default Protected;
