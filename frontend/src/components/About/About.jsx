import React from "react";
import styles from "./about.module.css";
function About() {
  return (
    <section>
      <section className={styles.evangadi_questiona_answer}>
        <span>About</span>
        <div className={styles.question_paragraph}>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum,
            iure facere vero cupiditate saepe hic? Aliquid in delectus suscipit
            cupiditate eos omnis possimus ullam nulla molestiae, aspernatur quos
            reiciendis!
          </p>
          <p>
            eveniet? Consectetur voluptatem, placeat nam culpa cum vitae dolor
            laboriosam temporibus quae! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum nisi sed error magnam impedit atque!
            Inventore tempore et quaerat veritatis voluptas blanditiis ipsum
            soluta?
          </p>
        </div>
        <div className={styles.how_it_works}>
          <button>HOW IT WORKS</button>
        </div>
      </section>
    </section>
  );
}

export default About;
