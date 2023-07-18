import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import database from '../../firebase/firebase';

const Modal = ({ onClose }) => {
  const id = Date.now();
  const date = new Date().toLocaleDateString();
  const [initialValue, setInitialValues] = useState({
    title: "",
    description: "",
  });

  const addCard = (e) => {
    e.preventDefault();
    const UserId = localStorage.getItem("UserId");
    const notesId = JSON.parse(localStorage.getItem("Notes")) || [];

    let letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];

    console.log(color);

    const userNotes = {
      title: initialValue.title,
      description: initialValue.description,
      id: id,
      date: date,
      color: color,
    };
    database.collection("data").add(userNotes).then((docref) => {
      alert("Data Successfully Submitted");
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
    // const unotes = notesId.find((value) => {
    //   if (value.UserId === UserId) return value;
    // });
    // if (unotes !== undefined && unotes.UserId === UserId) {
    //   const { notesArray } = unotes;

    //   notesArray.push(userNotes);
    // } else {
    //   const userData = {
    //     UserId,
    //     notesArray: [userNotes],
    //   };
    //   notesId.push(userData);
    // }
    // let validate = initialValue.title === "" && initialValue.description === "";
    // if (validate) {
    //   alert("inputs empty");
    //   return;
    // }
    // localStorage.setItem("Notes", JSON.stringify(notesId));
    onClose();
  };

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log(!ref.current.contains(e.target));

        onClose();
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
              onClick={addCard}
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
