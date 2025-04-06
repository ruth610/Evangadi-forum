import React from "react";
import styles from "./header.module.css";
import Logo from "../../assets/HeaderLogo.png";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/'
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <Link href="#">
        <img src={Logo} alt="" />
      </Link>

      <div className={styles.navbar}>
        <ul>
          <div className={styles.home}>
            <Link to={"/home"}>Home</Link>
            <li>How it Works</li>
          </div>

          <li className={styles.btn} onClick={logout}>
            {
              isLandingPage ?('login'):('logout')
            }
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
