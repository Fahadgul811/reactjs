import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";

const EditModal = ({ onCloseEdit, onUpdate }) => {
  const [initialValue, setInitialValues] = useState({
    title: onUpdate.title,
    description: onUpdate.description,
  });

  const updateCard = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const notes = JSON.parse(localStorage.getItem("Notes")) || [];
    const UserId = localStorage.getItem("UserId");
    const newNotes = JSON.parse(localStorage.getItem("Notes")) || [];
    const desiredData = notes.find(
      (value) => value.UserId === UserId
    ).notesArray;
    const notesId = onUpdate.id;
    const index = desiredData.findIndex((note) => note.id == notesId);

    const updatedNotes = {
      title: initialValue.title,
      description: initialValue.description,
      id: onUpdate.id,
      date: date,
      color: onUpdate.color,
    };

    desiredData.splice(index, 1, updatedNotes);
    const oldArray = newNotes;
    const updateUserData = { ...oldArray[index], notesArray: desiredData };

    notes.splice(index, 1, updateUserData);

    localStorage.setItem("Notes", JSON.stringify(notes));
    console.log("🚀 ~ file: EditModal.jsx:27 ~ EditModal ~ notes:", notes);
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
