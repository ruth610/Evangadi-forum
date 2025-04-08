import React from "react";
import { ScaleLoader } from "react-spinners";
import styles from "./loader.module.css";
function Loader() {
  return (
    <>
      
      <div className={styles.loader_container}>
         <ScaleLoader color="#FF8704" size={60} speedMultiplier={0.8} />
      </div>
    </>
  );
}

export default Loader;
