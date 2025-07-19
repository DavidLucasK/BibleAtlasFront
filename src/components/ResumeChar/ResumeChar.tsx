"use client";

import { useEffect, useState } from "react";
import styles from "./ResumeChar.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Resume = {
  id: number;
  character_id: number;
  resume_text: string;
  time_name: string;
};

type Props = {
  characterId: number;
  title: string | null;
};

export default function ResumeCharComponent({ characterId, title }: Props) {
  const searchParams = useSearchParams();
  const imgUrl = searchParams.get("img");

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFadeIn(true);
    }
  }, [loading]);

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch(
          `https://bibleatlas.vercel.app/api/characters?character_id=${characterId}`
        );
        const data = await res.json();

        if (data.resume && data.resume.length > 0) {
          setResume(data.resume[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar resumo:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResume();
  }, [characterId]);

  if (loading)
    return (
      <div className={styles.mainContainer}>
        <div className={styles.spinner}></div>
      </div>
    );

  return (
    <div className={`${styles.pageContainer} ${fadeIn ? styles.fadeIn : ""}`}>
      <div className={styles.header}>
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={title ?? "Imagem do personagem"}
            width={200}
            height={200}
            className={styles.characterImage}
          />
        )}
        <h1 className={styles.characterName}>{title ?? "Personagem"}</h1>
        <h2 className={styles.timeName}>
          Nome em hebraico: {resume ? resume.time_name : "Personagem"}
        </h2>
      </div>

      {resume ? (
        <div className={styles.resumeBox}>
          <p>{resume.resume_text}</p>
        </div>
      ) : (
        <p>Sem resumo disponível para este personagem.</p>
      )}
    </div>
  );
}
