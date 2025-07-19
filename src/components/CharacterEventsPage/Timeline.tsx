/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styles from "./CharacterEvents.module.css";

type TimelineProps = {
  characterId: number;
  activeEventId: number | null;
  setActiveEventId: (id: number) => void;
};

export default function Timeline({
  characterId,
  activeEventId,
  setActiveEventId,
}: TimelineProps) {
  return (
    <div className={styles.timelineContainer}>
      <h2>Timeline de Eventos</h2>
      <p>ID do Personagem: {characterId}</p>
      <p>Evento ativo: {activeEventId}</p>

      {/* Aqui futuramente vamos listar os eventos com onClick chamando setActiveEventId */}
    </div>
  );
}
