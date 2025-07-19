/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styles from "./CharacterEvents.module.css";

type MapContainerProps = {
  characterId: number;
  activeEventId: number | null;
  setActiveEventId: (id: number) => void;
};

export default function MapContainer({
  characterId,
  activeEventId,
  setActiveEventId,
}: MapContainerProps) {
  return (
    <div className={styles.mapContainer}>
      <h2>Mapa dos Eventos</h2>
      <p>ID do Personagem: {characterId}</p>
      <p>Evento ativo: {activeEventId}</p>

      {/* Aqui futuramente vamos renderizar o Google Maps com os pins */}
    </div>
  );
}
