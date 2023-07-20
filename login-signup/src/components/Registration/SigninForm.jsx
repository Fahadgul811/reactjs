import React, { useState } from "react";
import styles from "./SigninForm.module.css";
import hide from "../images/hide.png";
import RegisterForm from "./RegisterForm";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signIn } from "../../firebase/firebaseFunctions";

const initialValues = {
  email: "",
  password: "",
};
const SigninForm = ({ onLoggedIn }) => {
  const [error, seterror] = useState("");
  const { set: setCookie } = Cookies;
  const handleLogin = () => {
    setCookie("isLoggedIn", true);
    onLoggedIn();
  };
  const navigate = useNavigate();
  const handleSubmission = async (values) => {
    const { email, password } = values;
    if (!email) {
      seterror("Email is required");
      return;
    }
    try {
      const res = await signIn(email, password);
      if (res === true) {
        handleLogin();
        navigate("/");
      } else if (res.error) {
        seterror(res.error);
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: handleSubmission,
    });
  const [toggle, setToggle] = useState(false);
  const switchToSignup = () => {
    setToggle(true);
  };
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div>
      {!toggle && (
        <div className={styles.signin}>
          <form className={styles.card} onSubmit={handleSubmit}>
            <div className={styles.cardHeader}>
              <h6>ALREADY MEMBERS</h6>
              <a>Need Help?</a>
            </div>
            <div className={styles.group}>
              <div className={styles.inputField}>
                <div className={styles.inputBlock}>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className={styles.formError}>{errors.email}</p>
                  ) : null}
                </div>
                <div className={styles.inputBlock}>
                  <input
                    type={passwordType}
                    onChange={handleChange}
                    name="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className={styles.formError}>{errors.password}</p>
                  ) : null}
                </div>
                <img
                  className={styles.eyeImgSignin}
                  src={hide}
                  alt=""
                  onClick={togglePassword}
                />
              </div>
              <button className={styles.signInBtn} type="submit">
                Sign In
              </button>
            </div>
          </form>
          <div className={styles.clipText}>
            <p>Don't have an account yet ?</p>
            <a onClick={switchToSignup}>Create account</a>
          </div>
        </div>
      )}
      {toggle && <RegisterForm />}
    </div>
  );
};

export default SigninForm;
