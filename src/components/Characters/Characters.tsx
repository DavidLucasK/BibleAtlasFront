"use client";

import { useMemo, useState } from "react";
import styles from "./Characters.module.css";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

type Character = {
  id: number;
  name: string;
  is_man: boolean;
  new_testament: boolean;
  is_disciple: boolean;
  time_name: string | null;
  url_img: string;
  role: string;
};

export default function CharactersComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12;

  const {
    data: characters,
    loading,
    error,
  } = useFetch<Character[]>("https://bibleatlas.vercel.app/api/characters");

  console.log("characters received:", characters);

  const filteredCharacters = useMemo(() => {
    if (!Array.isArray(characters)) {
      return [];
    }

    return characters
      .filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((char) => {
        if (filterOption === "novo") return char.new_testament;
        if (filterOption === "velho") return !char.new_testament;
        return true;
      })
      .sort((a, b) => {
        if (filterOption === "alfabetico") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [characters, searchTerm, filterOption]);

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const startIndex = (currentPage - 1) * charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + charactersPerPage
  );

  return (
    <div className={styles.historiesContainer}>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Personagens</h1>
        {error ? (
          <h3>Erro ao buscar personagens.</h3>
        ) : loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.filters}>
              <input
                type="text"
                placeholder="Pesquisar"
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

            <div className={styles.pagination}>
              {/* {currentPage !== 1 ? (
                <div className={styles.btnsFilter}>{prevText}</div>
              ) : (
                ""
              )} */}
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

            <div className={styles.gridCharacters}>
              {currentCharacters.map((char) => (
                <Link
                  key={char.id}
                  href={`/resume_char/${char.id}?title=${encodeURIComponent(
                    char.name
                  )}&img=${encodeURIComponent(char.url_img)}`}
                >
                  <div
                    className={styles.cardChar}
                    style={{
                      backgroundImage: `url(${char.url_img})`,
                    }}
                  >
                    <div className={styles.overlay}></div>
                    <div className={styles.charInfo}>
                      <p className={styles.charName}>{char.name}</p>
                      {char.role ? (
                        <p className={styles.charSub}>{char.role}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
