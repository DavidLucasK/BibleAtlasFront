"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import styles from "./EventDetails.module.css";
import EventDetailsComponent from "@/components/EventDetails/EventDetails";

export default function Events() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState("event");
  const { id } = useParams();
  const eventId = Number(id);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar onNavigate={handleNavigate} />
      <EventDetailsComponent eventId={eventId} title={title} />
      <Footer />
    </div>
  );
}
