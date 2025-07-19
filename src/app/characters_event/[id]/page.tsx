"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";
import styles from "./CharacterEvents.module.css";
import CharacterEventsPage from "./CharacterEventsPage";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("characters_event");

  // 2️⃣ Função para atualizar a página ao clicar na Navbar
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar onNavigate={handleNavigate} />
      <CharacterEventsPage />
      <Footer />
    </div>
  );
}
