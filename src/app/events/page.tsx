"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import EventsComponent from "./../../components/Events/Events";
import { useState } from "react";

export default function Histories() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState("histories");

  // 2️⃣ Função para atualizar a página ao clicar na Navbar
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageContainer">
      <Navbar onNavigate={handleNavigate} />
      <EventsComponent characterId={null} />
      <Footer />
    </div>
  );
}
