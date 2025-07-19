"use client";

import Link from "next/link";
import styles from "./CtaHome.module.css";
import { FaArrowRight } from "react-icons/fa6";

export default function CtaHome() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.splitSection}>
        <div className={styles.splitLeft}>
          <div className={styles.splitOverlay}>
            <h2>Conecte fé e história de forma interativa</h2>
            <p>
              Descubra onde os eventos bíblicos aconteceram, explore as cidades
              antigas e mergulhe em um mapa interativo repleto de informações
              baseadas nas Escrituras.
            </p>
            <p className={styles.teste}>
              <Link href="/characters/1" className={styles.cta}>
                <span>Conhecer histórias</span>
                <FaArrowRight className={styles.icon} />
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.splitRight}></div>
      </section>
    </div>
  );
}
