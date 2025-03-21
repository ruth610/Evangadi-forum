import React from "react";
import styles from "./header.module.css";
import Logo from "../../assets/HeaderLogo.png";
function Header() {
  return (
    <header className={styles.header}>
      <a href="#">
        <img src={Logo} alt="" />
      </a>

      <div className={styles.navbar}>
        <ul>
          <li>Home</li>
          <li>How it Works</li>
          <li>
            <button>SIGN IN</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
