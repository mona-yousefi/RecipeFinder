import styles from "../styles/index.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search-results?query=${encodeURIComponent(query)}`);
    } else {
      alert("Please enter a search term.");
    }
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className={styles.mainDiv}>
          <input
            type="text"
            value={query}
            placeholder="Search Whatever Recipes You Would Like!"
            onChange={(e) => setQuery(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </section>
    </>
  );
};
export default Home;
