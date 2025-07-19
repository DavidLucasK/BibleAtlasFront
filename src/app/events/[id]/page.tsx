"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import styles from "./MapEvent.module.css";

type Pin = {
  id: string;
  lat: string;
  log: string;
  title: string;
  description: string;
};

const Map = dynamic(() => import("@/components/Map/Map"), { ssr: false });

export default function Events() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState("event");
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<Pin[]>([]);

  const { id } = useParams();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!id) return;

    async function getPins() {
      try {
        const res = await fetch(
          `https://bibleatlas.vercel.app/api/pins?event_id=${id}`
        );
        const data = await res.json();
        setPins(data);
      } catch (error) {
        console.error("Erro ao buscar pins:", error);
      } finally {
        setLoading(false);
      }
    }

    getPins();
  }, [id]);

  const convertedPins = pins.map((pin) => ({
    ...pin,
    lat: Number(pin.lat),
    lng: Number(pin.log),
    title: pin.title,
  }));

  const center =
    convertedPins.length > 0
      ? { lat: convertedPins[0].lat, lng: convertedPins[0].lng }
      : { lat: 0, lng: 0 };

  return (
    <div className={styles.pageContainer}>
      <Navbar onNavigate={handleNavigate} />
      <div>
        {!loading && convertedPins.length > 0 && (
          <Map pins={convertedPins} center={center} />
        )}
      </div>
      <Footer />
    </div>
  );
}
