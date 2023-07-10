import React, { useState } from "react";
import styles from "./HomeContainer.module.css";
import FloatingBtn from "./FloatingBtn";
import Modal from "./Modal";
const HomeContainer = () => {

const [modal, setModal] = useState(false);


  return (
  <div>
   
 
    <FloatingBtn setModal={setModal}/>
   {modal === true && (
    <Modal setModal={setModal}/>
   )}
    
  </div>
 
    )
};

export default HomeContainer;
