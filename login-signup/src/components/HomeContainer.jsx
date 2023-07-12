import React, { useState } from "react";
import styles from "./HomeContainer.module.css";
import logoutImg from "../images/logout.png";
import editImg from "../images/edit.svg";
import Xmark from "../images/xmark.svg";

import Modal from "./Modal";
const HomeContainer = ({ onLoggedOut }) => {
  const [modal, setModal] = useState(false);
  const getNotes = JSON.parse(localStorage.getItem("Notes")) || [];
  const UserId = localStorage.getItem("UserId");
  const desiredNotes = getNotes?.find(
    (value) => value.UserId === UserId
  )?.notesArray;

  return (
    <div>
      <div className={styles.navbar}>
        <img
          className={styles.logoutbtn}
          onClick={onLoggedOut}
          src={logoutImg}
          alt=""
        />
      </div>
      <div className={styles.cardsMain}>
        {desiredNotes && desiredNotes.length > 0 ? (
          desiredNotes.map((note) => (
            <div key={note?.id} className={styles.card}>
              <div className={styles.cardTop}>
                <p className={styles.title}>{note?.title}</p>
                <img className={styles.xmark} src={Xmark} alt="" />
              </div>
              <p className={styles.description}>{note?.description}</p>
              <div className={styles.bottom}>
                <p className={styles.date}>{note?.date}</p>
                <img className={styles.edit} src={editImg} alt="" />
              </div>
            </div>
          ))
        ) : (
          <div>add notes</div>
        )}
      </div>

      <button onClick={() => setModal(true)} className={styles.float}>
        +
      </button>

      {modal === true && <Modal onClose={() => setModal(false)} />}
    </div>
  );
};

export default HomeContainer;
