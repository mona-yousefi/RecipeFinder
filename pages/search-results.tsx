/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/search-results.module.css";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: string;
}

const SearchResults: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (query) {
      FetchRecipes(query as string, 0);
    }
  }, [query]);

  const FetchRecipes = async (searchQuery: string, currentOffset: number) => {
    setLoading(true);
    const apiKey = "b15461cfa5bc469aa1c0ac2cd3cba422";
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${apiKey}&offset=${currentOffset}`
      );
      const data = await response.json();
      setLoading(false);
      if (currentOffset === 0) {
        setRecipes(data.results); 
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.results]); 
      }
    } catch (err) {
      console.log('Error has happened', err);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (query) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + 10; 
        FetchRecipes(query as string, newOffset);
        return newOffset;
      });
    }
  };

  if (loading && recipes.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.para}>Search Results</h1>
      <div className={styles.resultsGrid}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className={styles.recipeCard}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>Ready in {recipe.readyInMinutes} minutes</p>
              <Link href={`/recipe/${recipe.id}`} rel="noopener noreferrer">
                View Recipe
              </Link>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {!loading && recipes.length > 0 && (
        <button onClick={handleLoadMore} className={styles.btn}>
          Load More
        </button>
      )}

      {loading && recipes.length > 0 && (
        <p>Loading more recipes...</p>
      )}
    </div>
  );
};

export default SearchResults;

