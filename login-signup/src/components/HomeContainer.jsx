import React, { useState, useEffect } from "react";
import styles from "./HomeContainer.module.css";
import logoutImg from "../images/logout.png";
import editImg from "../images/edit.svg";
import Xmark from "../images/xmark.svg";
import { motion } from "framer-motion";
import DelModal from "./DelModal";
import Modal from "./Modal";
import EditModal from "./EditModal";
import logo from "../images/logo.png"
const HomeContainer = ({ onLoggedOut }) => {
  const UserId = localStorage.getItem("UserId");
  const uId = parseInt(localStorage.getItem("UserId"), 10);
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [id, setId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [updateNote, setUpdateNote] = useState("");
  const prev = JSON.parse(localStorage.getItem("registration"));
  const displayUserName = prev.find((value) => value.id === uId);
const displayName = [displayUserName];
 
  const getNotes = JSON.parse(localStorage.getItem("Notes")) || [];

  const desiredNotes = getNotes?.find(
    (value) => value.UserId === UserId
  )?.notesArray;
  console.log("🚀 ~ file: HomeContainer.jsx:28 ~ HomeContainer ~ desiredNotes:", desiredNotes)
  const deleteData = () => {
    const notes = JSON.parse(localStorage.getItem("Notes")) || [];
    const UserId = localStorage.getItem("UserId");
    const desiredData = notes.find(
      (value) => value.UserId === UserId
    ).notesArray;
    const index = desiredData.findIndex((note) => note.id == id);
    if (index !== -1) {
      desiredData.splice(index, 1);
      localStorage.setItem("Notes", JSON.stringify(notes));
      setDelModal(false);
    }
  };
  const handleDelete = (key) => {
    setId(key);
    console.log(id);

    setDelModal(true);
  };
  const handleEdit = (note) => {
    setUpdateNote(note);

    setEditModal(true);
  };
  useEffect(() => {
    const handlePopstate = () => {
      onLoggedOut();
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [onLoggedOut]);
  return (
    <div>
      {displayName && displayName.length > 0 ? (
          displayName.map((user) => (
      <div
      key={user?.id}
      className={styles.navbar}>
        <div >
        <h1 className={styles.heading}>NOTE SHOPPER</h1>
        </div>
      <div className={styles.imgMain}>
        <p className={styles.logout}>
        {user?.name}
        </p>
      <motion.img
        whileHover={{scale: 1.2}}
          className={styles.logoutbtn}
          onClick={onLoggedOut}
          src={logoutImg}
          alt=""
        />
      </div>
      </div>
        ))
        ) : (
          <div>User Name</div>
        )}
      <div className={styles.cardsMain}>
        {desiredNotes && desiredNotes.length > 0 ? (
          desiredNotes.map((note) => (
            <motion.div
            whileHover={{scale: 1.1}}
              key={note?.id}
              style={{ backgroundColor: note?.color }}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <p className={styles.title}>{note?.title}</p>
                <motion.img
                  onClick={() => handleDelete(note.id)}
                  whileHover={{ scale: 1.2 }}
                  className={styles.xmark}
                  src={Xmark}
                  alt=""
                />
              </div>
              <p className={styles.description}>{note?.description}</p>
              <div className={styles.bottom}>
                <p className={styles.date}>{note?.date}</p>
                <motion.img
                  onClick={() => handleEdit(note)}
                  whileHover={{ scale: 1.2 }}
                  className={styles.edit}
                  src={editImg}
                  alt=""
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className={styles.homeText}>
            <h1 className={styles.addNoteText}>
              Click on + Button to add notes
            </h1>
          </div>
        )}
      </div>

      <motion.button whileHover={{scale: 1.2}} onClick={() => setModal(true)} className={styles.float}>
        +
      </motion.button>
      {modal === true && <Modal onClose={() => setModal(false)} />}
      {delModal === true && (
        <DelModal onDel={deleteData} onCross={() => setDelModal(false)} />
      )}
      {editModal === true && (
        <EditModal
          onUpdate={updateNote}
          onCloseEdit={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default HomeContainer;
