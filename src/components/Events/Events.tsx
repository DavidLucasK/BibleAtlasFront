/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Events.module.css";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";

type Event = {
  id: number;
  title: string;
  new_testament: boolean;
};

type EventsComponentProps = {
  characterId: number | null;
};

export default function EventsComponent({ characterId }: EventsComponentProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [titlePage, setTitlePage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const {
    data: allEvents,
    loading: loadingAllEvents,
    error,
  } = useFetch<Event[]>("https://bibleatlas.vercel.app/api/events");

  useEffect(() => {
    async function fetchEventsByCharacter() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://bibleatlas.vercel.app/api/character_events?character_id=${characterId}`
        );
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos do personagem:", error);
      } finally {
        setLoading(false);
      }
    }

    if (characterId) {
      fetchEventsByCharacter();
      setTitlePage("Eventos do Personagem");
    } else if (allEvents) {
      setEvents(allEvents);
      setLoading(loadingAllEvents);
      setTitlePage("Eventos");
    }
  }, [characterId, allEvents, loadingAllEvents]);

  const filteredevents = useMemo(() => {
    if (!Array.isArray(events)) {
      return [];
    }

    return events
      .filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((char) => {
        if (filterOption === "novo") return char.new_testament;
        if (filterOption === "velho") return !char.new_testament;
        return true;
      })
      .sort((a, b) => {
        if (filterOption === "alfabetico") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [events, searchTerm, filterOption]);

  const totalPages = Math.ceil(filteredevents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredevents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  return (
    <div className={styles.historiesContainer}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>{titlePage}</h1>

        {loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.filters}>
              <input
                type="text"
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className={styles.searchInput}
              />

              <select
                value={filterOption}
                onChange={(e) => {
                  setFilterOption(e.target.value);
                  setCurrentPage(1);
                }}
                className={styles.selectFilter}
              >
                <option value="todos">Todos</option>
                <option value="alfabetico">Alfabético (A–Z)</option>
                <option value="novo">Novo Testamento</option>
                <option value="velho">Antigo Testamento</option>
              </select>
            </div>

            {currentEvents.length === 0 ? (
              <h3 className={styles.noEventsMessage}>
                Sem eventos para esse personagem
              </h3>
            ) : (
              <div className={styles.gridevents}>
                {currentEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/event_details/${
                      event.id
                    }?title=${encodeURIComponent(event.title)}`}
                  >
                    <div className={styles.cardevent}>
                      <p className={styles.eventName}>{event.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${styles.pageButton} ${
                    currentPage === index + 1 ? styles.activePage : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
