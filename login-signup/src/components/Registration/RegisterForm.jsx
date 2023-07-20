import { useState } from "react";
import styles from "./RegisterForm.module.css";
import hide from "../images/hide.png";
import SigninForm from "./SigninForm";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { signUp } from "../../firebase/firebaseFunctions";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const RegisterForm = () => {
  const [error, seterror] = useState("");
  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmission = async (values, action) => {
    const { email, password, name } = values;
    const res = await signUp(email, password, name);
    if (res === true) {
      alert("Registrstion successful move to Login");
      action.resetForm();
      refreshPage();
    }
    if (res.error) seterror(res.error);
    console.log(error);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: handleSubmission,
    });

  const [toggle, setToggle] = useState(false);
  const switchToSignin = () => {
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
        <form className={styles.signup} onSubmit={handleSubmit}>
          <div className={styles.signupCardHeader}>
            <h2>Create Account</h2>
          </div>
          <div className={styles.signupInputField}>
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
                type="text"
                name="name"
                placeholder="Enter user name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p className={styles.formError}>{errors.name}</p>
              ) : null}
            </div>
            <div className={styles.inputBlock}>
              <input
                type={passwordType}
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className={styles.formError}>{errors.password}</p>
              ) : null}
            </div>
            <img
              className={styles.eyeImgSignup}
              src={hide}
              alt=""
              onClick={togglePassword}
            />
            <div className={styles.inputBlock}>
              <input
                type={passwordType}
                name="confirm_password"
                placeholder="Re-enter your password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className={styles.formError}>{errors.confirm_password}</p>
              ) : null}
            </div>
            <img
              className={styles.eyeImgSignup}
              src={hide}
              alt=""
              onClick={togglePassword}
            />
            <div className={styles.pass}></div>
            <button className={styles.signupBtn} type="submit">
              Sign Up
            </button>
          </div>
          <div className={styles.clipTextSignup}>
            <p>Already have an account ?</p>
            <a onClick={switchToSignin}>Sign in</a>
          </div>
        </form>
      )}
      {toggle && <SigninForm />}
    </div>
  );
};

export default RegisterForm;
