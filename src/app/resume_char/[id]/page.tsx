/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import styles from "./ResumeChar.module.css";
import ResumeCharComponent from "@/components/ResumeChar/ResumeChar";

export default function ResumeCharPage() {
  const [currentPage, setCurrentPage] = useState("resume_char");
  const { id } = useParams();
  const characterId = Number(id);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      <ResumeCharComponent characterId={characterId} title={title} />
      <Footer />
    </div>
  );
}
