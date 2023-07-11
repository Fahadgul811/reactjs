import React, { useState, useRef } from "react";
import styles from "./HomeContainer.module.css";

import Modal from "./Modal";
const HomeContainer = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <button onClick={() => setModal(true)} className={styles.float}>
        +
      </button>

      {modal === true && <Modal onClose={() => setModal(false)} />}
    </div>
  );
};

export default HomeContainer;
