"use client";

import Navbar from "../components/Navbar/Navbar";
import HomeContent from "../components/Home/Home";
import AboutContent from "../components/About/About";
import Footer from "@/components/Footer/Footer";

import { useState } from "react";
import CtaHome from "@/components/CtaHome/CtaHome";
import FeaturedChars from "@/components/FeaturedChars/FeaturedChars";

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState("/");

  // 2️⃣ Função para atualizar a página ao clicar na Navbar
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageContainer">
      <Navbar onNavigate={handleNavigate} />
      <HomeContent />
      <AboutContent />
      <CtaHome />
      <FeaturedChars />
      <Footer />
    </div>
  );
}
