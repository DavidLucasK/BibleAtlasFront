"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Timeline from "@/components/CharacterEventsPage/Timeline";
import MapContainer from "@/components/CharacterEventsPage/MapContainer";
import styles from "./CharacterEvents.module.css";

export default function CharacterEventsPage() {
  const { id } = useParams();
  const characterId = Number(id);
  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.timelineSection}>
        <Timeline
          characterId={characterId}
          activeEventId={activeEventId}
          setActiveEventId={setActiveEventId}
        />
      </div>

      <div className={styles.mapSection}>
        <MapContainer
          characterId={characterId}
          activeEventId={activeEventId}
          setActiveEventId={setActiveEventId}
        />
      </div>
    </div>
  );
}
