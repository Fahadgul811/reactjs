import { useState, useEffect, useContext, useCallback } from "react";
import styles from "./HomeContainer.module.css";
import logoutImg from "../images/logout.png";
import editImg from "../images/edit.svg";
import Xmark from "../images/xmark.svg";
import { motion } from "framer-motion";
import DelModal from "./DelModal";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Authentication/AuthContext";
import Loader from "./Loader";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseFunctions";
const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [id, setId] = useState("");
  const [updateNote, setUpdateNote] = useState("");
  const [desiredNotes, setDesiredNotes] = useState("");
  const [displayName, setUsername] = useState(null);
const [Loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLoggedOut = async () => {
    try{
await logout();
navigate("/");

    }
    catch(error){
      console.log(error.message)
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      const notesCollection = collection(db, "users");
      const notesQuery = query(notesCollection, where("uid", "==", user.uid));

      const querySnapshot = await getDocs(notesQuery);
      
      const Users = querySnapshot.docs.map((doc) => {
        return doc.data();
        
      });
      setUsername(Users);
    } catch (error) {
      console.error("Error getting documents: ", error.message);
    }
  }, [user, setUsername, db]);

  useEffect(() => {
    if (user !== null) {
      fetchUser();
      
    }
  }, [user]);

  if (user !== null) {
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, "notes");
        const notesQuery = query(notesCollection, where("uid", "==", user.uid));

        const querySnapshot = await getDocs(notesQuery);
        setLoading(false);
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
  if (Loading) {
    return <Loader />
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
    setModal(true);
  };

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     onLoggedOut();
  //   window.addEventListener("popstate", handlePopstate);
  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }},[onLoggedOut]);

  const onClose = () => {
    setModal(false);
    setUpdateNote();
  };

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
                onClick={handleLoggedOut}
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
              whileHover={{ scale: 1.03 }}
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
      {modal === true && <Modal onUpdate={updateNote} onClose={onClose} />}
      {delModal === true && (
        <DelModal onDel={deleteData} onCross={() => setDelModal(false)} />
      )}
    </div>
  );
};

export default HomeContainer;
