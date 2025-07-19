"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import logo from "../../../public/assets/BibleAtlasLogoTextSideNOBGImproved2.png";
import Link from "next/link";
import NavItem, { NavItemInterface } from "../NavItem/NavItem";
import { usePathname } from "next/navigation";
import { FaBars, FaRegHeart, FaXmark } from "react-icons/fa6";
import React from "react";

interface NavbarProps {
  onNavigate: (page: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Navbar({ onNavigate }: NavbarProps) {
  const items: NavItemInterface[] = [
    {
      url: "/about",
      label: "Projeto",
    },
    {
      url: "/characters",
      label: "Personagens",
    },
    {
      url: "/events",
      label: "Eventos",
    },
    {
      url: "/contact",
      label: "Contato",
    },
  ];

  const pathName = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Itens do meio */}
      <ul className={`${styles.bagulhos} ${openMenu ? styles.open : ""}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={pathName === item.url ? styles.active : ""}
          >
            <NavItem
              url={item.url}
              label={item.label}
              isActive={pathName === item.url}
              openMenu={openMenu}
            />
          </li>
        ))}
      </ul>

      {/* Botão Maps */}
      <div className={styles.contribuaContainer}>
        <Link href="/characters/1" className={styles.botaoContribua}>
          <FaRegHeart className={styles.icon} />
          <p>Contribua</p>
        </Link>
      </div>

      {/* Botão Mobile */}
      <button
        className={`${styles.btnMobile} ${scrolled ? styles.scrolled : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        {!openMenu ? <FaBars /> : <FaXmark />}
      </button>
    </nav>
  );
}

export default React.memo(Navbar);
