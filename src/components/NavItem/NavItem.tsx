"use client";

import Link from "next/link";
import styles from "./NavItem.module.css";
import { useEffect, useState } from "react";

export interface NavItemInterface {
  url: string;
  label: string;
  isActive?: boolean;
  openMenu?: boolean;
}

export default function NavItem(props: NavItemInterface) {
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
    <Link
      href={props.url}
      className={`${styles.navItem} 
            ${scrolled ? styles.navItemScrolled : ""} 
            ${props.isActive ? styles.active : ""} 
            ${props.openMenu ? styles.open : ""}`}
    >
      {props.label}
    </Link>
  );
}
