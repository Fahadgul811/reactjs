import React from "react";
import styles from "../components/FloatingBtn.module.css";

const FloatingBtn = ({setModal}) => {
  return <div>
<button onClick={() => setModal(true)} className={styles.float}>+</button>
  </div>;
};

export default FloatingBtn;
