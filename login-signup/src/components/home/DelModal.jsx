import React from "react";
import styles from "./DelModal.module.css";
import { useRef, useEffect } from "react";

const DelModal = ({ onCross, onDel }) => {
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log(!ref.current.contains(e.target));
        onCross();
      }
    };
    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside, true);
    };
  }, [ref]);
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.delModal}>
      <div className={styles.trashDialog} ref={ref}>
        <p className={styles.trashText}>Are you sure you want to delete!!</p>
        <div className={styles.conformation}>
          <button onClick={onDel} className={styles.confirm}>
            yes
          </button>
          <button className={styles.no} onClick={onCross}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelModal;
