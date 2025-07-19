"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CharactersComponent from "@/components/Characters/Characters";
import { useState } from "react";

export default function Characters() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState("characters");

  // 2️⃣ Função para atualizar a página ao clicar na Navbar
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageContainer">
      <Navbar onNavigate={handleNavigate} />
      <CharactersComponent />
      <Footer />
    </div>
  );
}
