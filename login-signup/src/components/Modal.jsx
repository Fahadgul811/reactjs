import React, { useEffect, useRef } from "react";
import styles from "../components/Modal.module.css";


const Modal = ({ onClose }) => {
    const ref = useRef()
    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {  
          onClose()
        
        }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
        document.removeEventListener("click", checkIfClickedOutside)
      }
    }, [onClose])
  
    useEffect(() => {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "auto"
      }
    }, [])
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={ref}>
        <form className={styles.form} >
          <input
            id="title"
            className={styles.title}
            type="text"
            placeholder="Insert Title"
          />
          <textarea id="description" placeholder="Enter text"></textarea>
          <div className={styles.formButtons}>
            <button className={styles.formAddbtn} type="submit">
              Add Note
            </button>
            <button
              onClick={onClose}
              type="button"
              className={styles.formCancelbtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    )
     }

export default Modal;
