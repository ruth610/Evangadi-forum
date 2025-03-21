import React, { useState } from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import styles from "./landing.module.css";
import homeBg from "./../../assets/home-backgraund.png";
import Layout from "../../components/Layout/Layout";
// import { useSpring, animated } from 'react-spring';
function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Layout>
      <section
        className={styles.landing_container}
        style={{
          backgroundImage: `url(${homeBg})`,
        }}
      >
        <div>
          {isLogin ? (
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          ) : (
            <Register isLogin={isLogin} setIsLogin={setIsLogin} />
          )}
        </div>
        <div className={styles.landing_about_container}>
          {/* <About /> */}
        </div>
      </section>
    </Layout>
  );
}

export default Landing;
