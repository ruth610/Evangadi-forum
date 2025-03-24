import React, { useState } from "react";
import { useRef } from "react";
import Instance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoEye } from "react-icons/go";

function Login({ setShowLogin }) {
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPass, setShowPass] = useState(true);
  const [textpass, setTextPass] = useState("password");
  const navigate = useNavigate();
  function passToggler() {
    setShowPass(!showPass);
    if (passwordDom.current.type === "password") {
      setTextPass("text");
    } else {
      setTextPass("password");
    }
  }
  async function handlesubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please provide all required information");
      return;
    }

    try {
      const { data } = await Instance.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });

      console.log(data);
      localStorage.setItem("token", data.token);
      alert("login successfull");
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <section className={styles.input_container}>
      <section className={styles.input_form}>
        <h2>Join the network</h2>
        <p
          className={styles.create_account}
          onClick={() => setShowLogin(false)}
        >
          Don't have an account?
          <span className={styles.sign_in}> Create a new account</span>
        </p>
        <form action="" onSubmit={handlesubmit}>
          <div className={styles.email_container}>
            <input type="email" placeholder="Email" ref={emailDom} />
          </div>
          <br />
          <div className={styles.password_container}>
            <input type={textpass} placeholder="password" ref={passwordDom} />
            <span onClick={passToggler}>
              {showPass ? <FaRegEyeSlash /> : <GoEye color="ff8000" />}
            </span>
          </div>
          <button type="submit" className={styles.login}>
            {" "}
            Login
          </button>
        </form>
      </section>
    </section>
  );
}

export default Login;
