import { useEffect, useRef, useContext} from "react";
import styles from "./Modal.module.css";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import AuthContext from "../../Authentication/AuthContext";

const Modal = ({ onClose, onUpdate }) => {
  const initialValue = {
    title: onUpdate?.title || "",
    description: onUpdate?.description || "",
  }
  const { user } = useContext(AuthContext);
  const date = new Date().toLocaleDateString();
  const db = getFirestore();
  const id = Date.now();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside, true);
    };
  }, [ref]);

  const handleSubmit = (e) =>{
 e.preventDefault();
    if(onUpdate){
      const updatedNotes = {
        title: e.target.title.value,
        description: e.target.description.value,
        id: onUpdate.id,
        date: date,
        color: onUpdate.color,
        uid: user.uid,
      }
      const editCard = doc(db, "notes", onUpdate.id.toString());
       updateDoc(editCard, updatedNotes);
      onClose();
    }
    else{
      let validate = e.target.title.value === "" && e.target.description.value === "";
    if (validate) {
      alert("inputs empty");
      return;
    }
    onClose();
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      uid: user.uid,
      date: date,
      id: id,
      color: color,
    };
    try {
       setDoc(doc(db, "notes", `${id}`), data, {
        merge: true,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={ref}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
          defaultValue={initialValue.title}
            className={styles.title}
            type="text"
            name="title"
            placeholder="Insert Title"
          />
          <textarea
          defaultValue={initialValue.description}
          name="description"
            placeholder="Enter text"
          ></textarea>
          <div className={styles.formButtons}>
            <button
              className={styles.formAddbtn}
              type="submit"
            >
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
  );
};

export default Modal;
