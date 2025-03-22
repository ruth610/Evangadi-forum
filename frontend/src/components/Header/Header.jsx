import React from "react";
import styles from "./header.module.css";
import Logo from "../../assets/HeaderLogo.png";
import {Link} from 'react-router-dom'
function Header() {
  return (
    <header className={styles.header}>
      <Link href="#">
        <img src={Logo} alt="" />
      </Link>

      <div className={styles.navbar}>
        <ul>
          <Link to={'/home'} >Home</Link>
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
