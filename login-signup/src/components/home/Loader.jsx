import React from "react";
import styles from "./loading.module.css"

const Loader = () => {
  return <div className={styles.loaderMain}><div className={styles.loader}></div></div>;
};

export default Loader;
