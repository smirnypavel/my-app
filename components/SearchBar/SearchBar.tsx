import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import styles from "../../styles/Page/ItemPage.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../redux/hooks";
import { googleAuth } from "../../redux/auth/authOperations";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const IsLogin = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { t } = useTranslation();

  const { id } = router.query;

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      try {
        if (typeof id === "string") {
          await dispatch(googleAuth(id));
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
      }
    };

    if (id) {
      authenticateWithGoogle();
    }
  }, [id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(""); // Отправляем пустую строку вместо поискового запроса
  };
  const handleAddProduct = () => {
    if (!IsLogin) {
      router.push("/auth/login");
      return;
    }
    router.push("/product/create");
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <form
          action=""
          className={styles.searchForm}
          onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={t("search.search")}
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className={styles.searchButton}
            onClick={onSubmit}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_137)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2753 3.46436C6.96095 3.46436 3.46436 6.96095 3.46436 11.2753C3.46436 15.5897 6.96095 19.0863 11.2753 19.0863C15.5888 19.0863 19.0863 15.5896 19.0863 11.2753C19.0863 6.961 15.5888 3.46436 11.2753 3.46436ZM1.96436 11.2753C1.96436 6.13252 6.13252 1.96436 11.2753 1.96436C16.4171 1.96436 20.5863 6.13247 20.5863 11.2753C20.5863 16.4181 16.4171 20.5863 11.2753 20.5863C6.13252 20.5863 1.96436 16.4181 1.96436 11.2753Z"
                  fill="#070721"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.8987 19.2378C19.5336 19.2378 19.2373 19.5347 19.2373 19.8983C19.2373 20.2637 19.5336 20.5597 19.8987 20.5597C20.2632 20.5597 20.5592 20.2644 20.5592 19.8983C20.5592 19.5341 20.2632 19.2378 19.8987 19.2378ZM17.7373 19.8983C17.7373 18.7056 18.7058 17.7378 19.8987 17.7378C21.0923 17.7378 22.0592 18.7063 22.0592 19.8983C22.0592 21.0922 21.0923 22.0597 19.8987 22.0597C18.7058 22.0597 17.7373 21.0928 17.7373 19.8983Z"
                  fill="#070721"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_137">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
          {searchTerm.length > 0 && (
            <button
              className={styles.clearSearchButton}
              onClick={clearSearch}>
              <MdClose />
            </button>
          )}
        </form>
        <div className={styles.container}>
          {/* <Link
            href={"/product/create"}
            className={styles.linkAdd}></Link> */}

          <button
            className={styles.linkAdd}
            onClick={handleAddProduct}>
            {t("search.addButton")}
          </button>
        </div>
      </div>
    </>
  );
}
