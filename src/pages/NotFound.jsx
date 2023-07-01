import React from "react";
import styles from "../NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div id={styles.mainC}>
        <div class={styles.message}>
          <h1>404</h1>
          <h3>the page you seek does not exist</h3>
        </div>
        <div class={styles.footer}>
          <a href="/react-ecommerce/" title="home">
            Main.me <span></span>
          </a>
          <p class={styles.legal}>DoYoung Coin &copy; 2023&nbsp;</p>
        </div>
      </div>
    </div>
  );
}
