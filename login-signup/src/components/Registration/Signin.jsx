import loginPerson from "../images/login-person.png";
import styles from "./Signin.module.css";
import SigninForm from "./SigninForm";

const Signin = ({ onLoggedIn }) => (
    <div className={styles.main}>
      <div className={styles.mainbox}>
        <img className={styles.img} src={loginPerson} alt="" />
        <div className={styles.clip}>
          <SigninForm onLoggedIn={onLoggedIn}/>
        </div>
      </div>
    </div>);

export default Signin;
