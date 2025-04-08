import { useEffect, useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./togglestyle.module.css";

import { Themecontext } from "./ThemeProvider";

const ThemeToggle = () => {

  const [lightTheme, setTheme] = useContext(Themecontext);

const toggleTheme = () => {
  setTheme(!lightTheme);
};

  useEffect(() => {
    const root = document.documentElement;
    if (!lightTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [lightTheme]);

  return (
    <button
      className={`${styles.toggle} ${!lightTheme ? styles.dark : ""}`}
      onClick={toggleTheme}
      aria-label={lightTheme ? "Switch to dark theme" : "Switch to light theme"}
    >
      <span className={styles.toggleCircle}>
        {!lightTheme ? (
          <FiMoon className={`${styles.icon} ${styles.moon}`} />
        ) : (
          <FiSun className={`${styles.icon} ${styles.sun}`} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
