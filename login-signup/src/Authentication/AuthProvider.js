import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import Loader from "../components/home/Loader";

const auth = getAuth();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  
 const logout =()=>{
  return signOut(auth);
}
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    setUser(currentUser);
    setLoading(false);
  });
  return () => {
    unsubscribe();
  };
}, [auth]);
if (loading) {
  return <Loader />
}
  return (
    <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
  );
};
