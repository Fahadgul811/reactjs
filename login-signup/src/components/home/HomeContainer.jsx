import { useState, useEffect, useContext } from "react";
import styles from "./HomeContainer.module.css";
import logoutImg from "../images/logout.png";
import editImg from "../images/edit.svg";
import Xmark from "../images/xmark.svg";
import { motion } from "framer-motion";
import DelModal from "./DelModal";
import Modal from "./Modal";
import EditModal from "./EditModal";
import { Navigate, json } from "react-router-dom";
import AuthContext from "../../Authentication/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const HomeContainer = ({ onLoggedOut }) => {
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [id, setId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [updateNote, setUpdateNote] = useState("");
  const [desiredNotes, setDesiredNotes] = useState("");
  const [displayName, setUsername] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      const fetchUser = async () => {
        try {
          const notesCollection = collection(db, "users");
          const notesQuery = query(
            notesCollection,
            where("uid", "==", user.uid)
          );

          const querySnapshot = await getDocs(notesQuery);

          const Users = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setUsername(Users);
        } catch (error) {
          console.error("Error getting documents: ", error.message);
        }
      };

      fetchUser();
    }
  }, [user]);

  if (user !== null) {
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, "notes");
        const notesQuery = query(notesCollection, where("uid", "==", user.uid));

        const querySnapshot = await getDocs(notesQuery);

        const notes = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setDesiredNotes(notes);
      } catch (error) {
        console.error("Error getting documents: ", error.message);
      }
    };
    fetchNotes();
  }

  const handleDelete = (key) => {
    setId(key);
    setDelModal(true);
  };

  const deleteData = async () => {
    deleteDoc(doc(db, "notes", id.toString()))
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });

    setDelModal(false);
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

  if (!user) {
    return <Navigate replace to="/" />;
  }
  return (
    <div>
      {displayName && displayName.length > 0 ? (
        displayName.map((user) => (
          <div key={user?.uid} className={styles.navbar}>
            <div>
              <h1 className={styles.heading}>NOTE SHOPPER</h1>
            </div>
            <div className={styles.imgMain}>
              <p className={styles.logout}>{user?.name}</p>
              <motion.img
                whileHover={{ scale: 1.2 }}
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
              whileHover={{ scale: 1.1 }}
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

      <motion.button
        whileHover={{ scale: 1.2 }}
        onClick={() => setModal(true)}
        className={styles.float}
      >
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
