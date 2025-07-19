"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./EventDetails.module.css";

type EventDetail = {
  id: number;
  event_id: number;
  order: number;
  text_content: string;
  image_url: string;
};

type EventDetailsComponentProps = {
  eventId: number;
  title: string | null;
};

export default function EventDetailsComponent({
  eventId,
}: EventDetailsComponentProps) {
  const [details, setDetails] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const res = await fetch(
          `https://bibleatlas.vercel.app/api/event_details?event_id=${eventId}`
        );
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do evento:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (details.length === 0) {
    return (
      <p className={styles.noDetails}>
        Nenhum detalhe disponível para esse evento.
      </p>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <h1>{title}</h1>
      {details.map((detail, index) => (
        <div
          key={detail.id}
          className={`${styles.detailBlock} ${
            index % 2 === 0 ? styles.textLeft : styles.textRight
          }`}
        >
          <div className={styles.text}>
            <p>{detail.text_content}</p>
          </div>
          <div className={styles.image}>
            {detail.image_url ? (
              <img src={detail.image_url} alt="Imagem do evento" />
            ) : (
              <div className={styles.imagePlaceholder}>
                Imagem não disponível
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
