import React from "react";
import styles from "../components/Modal.module.css"
const Modal = ({setModal}) => {
  return (<div className={styles.dialogShadow}>
     <div className={styles.dialog}>
      <form className={styles.form}>
     
        <input
          id="title"
         className={styles.title}
          type="text"
          placeholder="Insert Title"
        />
        <textarea id="description" placeholder="Enter text"></textarea>
        <div className={styles.formButtons}>
          <button className={styles.formAddbtn}  type="submit">
            Add Note
          </button>
          <button
         onClick={() => setModal(false)}
            type="button"
            className={styles.formCancelbtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)};

export default Modal;
