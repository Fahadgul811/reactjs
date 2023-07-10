import React, { useState } from "react";
import styles from "../components/HomeContainer.module.css"
import Modal from "./Modal";
const HomeContainer = () => {

const [modal, setModal] = useState(false);


  return (
  <div>
    <button onClick={() => setModal(true)} className={styles.float}>+</button>
   {modal  && 
    <Modal onClose={()=> setModal(false)}/>
   }
    
  </div>
 
    )
};

export default HomeContainer;
