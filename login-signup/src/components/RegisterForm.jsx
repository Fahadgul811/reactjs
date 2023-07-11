import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import hide from "../images/hide.png";
import SigninForm from "./SigninForm";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const RegisterForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        let id = Date.now();
        const { name, email, password } = values;
        const user = {
          id,
          name,
          email,
          password,
        };

        const prev = JSON.parse(localStorage.getItem("registration"));

        const validate = prev?.find((user) => user.email === email);

        if (validate) {
          alert("user already exists");
          return;
        }
        const update = [...(prev || []), user];
        localStorage.setItem("registration", JSON.stringify(update));
        alert("registration succcessful");

        action.resetForm();
      },
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
