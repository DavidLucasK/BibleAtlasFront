"use client";

import styles from "./Footer.module.css";
import Image from "next/image";
import logoDl from "../../../public/assets/BibleAtlasLogoNOBG.png";
import { useEffect, useState } from "react";
import React from "react";

function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.footerContainer} ${
        scrolled ? styles.footerContainerScrolled : ""
      }`}
    >
      <Image
        className={styles.logoImg}
        width={80}
        height={80}
        quality={100}
        src={logoDl}
        alt="5"
      />
      <p>© 2025 - BibleAtlas</p>
      <p>A Bíblia como você nunca viu</p>
    </div>
  );
}

export default React.memo(Footer);
