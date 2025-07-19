/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.about}>
        <h2 className={styles.aboutTitle}>
          Estudar a Bíblia com profundidade nunca foi tão visual.
        </h2>
        <p className={styles.aboutSubtitle}>
          O BibleAtlas conecta relatos bíblicos com mapas reais, aproximando
          história, fé e geografia em uma experiência única e interativa.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Mapas Interativos</h3>
            <p>
              Navegue por mapas em tempo real e explore os territórios citados
              na Bíblia.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Referência Visual</h3>
            <p>
              Explore visualmente as histórias, fortalecendo o estudo e
              compreensão bíblica.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Pins Históricos</h3>
            <p>
              Pontos marcados com eventos e locais relevantes mencionados nas
              Escrituras.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Cercas Virtuais</h3>
            <p>
              Visualize com exatidão onde ficavam as cidades bíblicas e seus
              limites.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
