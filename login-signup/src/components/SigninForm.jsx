import React, { useState } from "react";
import styles from "./SigninForm.module.css";
import hide from "../images/hide.png";
import RegisterForm from "./RegisterForm";
import { useFormik } from "formik";
import { signInSchema } from "../schemas";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const SigninForm = ({onLoggedIn}) => {
console.log("🚀 ~ file: SigninForm.jsx:15 ~ SigninForm ~ onLoggedIn:", onLoggedIn)

  
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        const { email, password } = values;
        const prev = JSON.parse(localStorage.getItem("registration"));
        const validate = prev?.find(
          (user) => user.email === email && user.password === password
        );
        if (validate) {
          const id = validate.id;
          
            onLoggedIn(true);
         
          
          
          
          localStorage.setItem("UserId", id);
          action.resetForm();
          
         
        
          navigate("/HomeContainer");
          return;
        } else {
          alert("invalid credentials");
        }
      },
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
              <button className={styles.signInBtn} type="submit" >
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
