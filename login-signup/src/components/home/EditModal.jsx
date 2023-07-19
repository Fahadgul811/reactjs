import  { useEffect, useRef, useState,useContext } from "react";
import styles from "./Modal.module.css";
import { db } from "../../firebase/firebase";
import { doc ,updateDoc} from "firebase/firestore";
import AuthContext from "../../Authentication/AuthContext";

const EditModal = ({ onCloseEdit, onUpdate }) => {
  const [initialValue, setInitialValues] = useState({
    title: onUpdate.title,
    description: onUpdate.description,
  });
  const { user } = useContext(AuthContext);
  const updateCard = async (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
  const updatedNotes = {
      title: initialValue.title,
      description: initialValue.description,
      id: onUpdate.id,
      date: date,
      color: onUpdate.color,
      uid: user.uid,
    }
    const editCard = doc(db, "notes", onUpdate.id.toString());
    await updateDoc(editCard, updatedNotes);
    onCloseEdit(false);
  };
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log(!ref.current.contains(e.target));
        onCloseEdit();
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
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={ref}>
        <form className={styles.form}>
          <input
            value={initialValue.title}
            onChange={(e) =>
              setInitialValues({ ...initialValue, title: e.target.value })
            }
            className={styles.title}
            type="text"
            placeholder="Insert Title"
          />
          <textarea
            value={initialValue.description}
            onChange={(e) =>
              setInitialValues({ ...initialValue, description: e.target.value })
            }
            placeholder="Enter text"
          ></textarea>
          <div className={styles.formButtons}>
            <button
              className={styles.formAddbtn}
              type="submit"
              onClick={updateCard}
            >
              Update
            </button>
            <button
              type="button"
              className={styles.formCancelbtn}
              onClick={onCloseEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditModal;
