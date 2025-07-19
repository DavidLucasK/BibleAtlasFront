import Link from "next/link";
import styles from "./FeaturedChars.module.css";
import { FaArrowRight } from "react-icons/fa6";

export default function FeaturedChars() {
  return (
    <div className={styles.featuredContainer}>
      <h2 className={styles.featuredTitle}>
        Personagens em <span className={styles.highlightText}>Destaque</span>
      </h2>
      <p className={styles.featuredSubtitle}>
        Conheça um dos personagens que estamos explorando na plataforma.
      </p>

      <div className={styles.charCard}>
        <h3 className={styles.charTitle}>Jesus Cristo</h3>
        <p className={styles.charSubtitle}>Novo Testamento</p>
        <p className={styles.charDesc}>
          Jesus de Nazaré, o Filho de Deus, cuja vida, ensinamentos, morte e
          ressurreição são o fundamento da fé cristã. Pregou o amor, o perdão e
          a salvação, transformando a história da humanidade.
        </p>
        <div className={styles.charTags}>
          <span>Evangelhos</span>
          <span>Messias</span>
          <span>Deus</span>
        </div>
        <Link href={`/characters_event/1`} className={styles.charButton}>
          <span>Ver Personagem</span>
          <FaArrowRight className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
