import loginPerson from "../images/login-person.png";
import styles from "./Signin.module.css";
import SigninForm from "./SigninForm";
import RegisterForm from "./RegisterForm";
import { Routes, Route } from "react-router-dom";

const Signin = ({onLoggedIn}) => {

  
  return (
    <div className={styles.main}>
      <div className={styles.mainbox}>
        <img className={styles.img} src={loginPerson} alt="" />
        <div className={styles.clip}>
          <Routes>
            <Route exact path="/" element={<SigninForm onLoggedIn={onLoggedIn}/>} />
            <Route exact path="RegisterForm" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Signin;
