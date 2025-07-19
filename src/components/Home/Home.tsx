"use client";

import Link from "next/link";
import styles from "./Home.module.css";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/VideoHome.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay}>
          <h1 className={styles.title}>
            <span className={styles.highlight}>A Bíblia</span> nos guia
          </h1>
          <h1 className={styles.subtitle}>
            O mapa mostra{" "}
            <span className={styles.highlight2}>
              <span className={styles.inner}>o caminho.</span>
            </span>
          </h1>
        </div>
        <Link href="/characters/1" className={styles.cta}>
          <span>Explorar o Mapa</span>
          <FaArrowRight className={styles.icon} />
        </Link>
      </section>
    </div>
  );
}
