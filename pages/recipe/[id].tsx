/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */

import { GetStaticProps } from "next";
import styles from "../../styles/recipeDetail.module.css"
import { MdFavoriteBorder } from 'react-icons/md';

interface RecipeDetailProps {
  recipe: {
    id:number;
    servings:number;
    readyInMinutes:number
    title: string;
    image: string;
    instructions: string;
    nutrition:{
      ingredients:[
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name:any
      ]
    }
    }
  };

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {

  const handleAddToFavorites=()=>{
    localStorage.setItem(`item ${recipe.id}`, recipe.title)
   }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <div className={styles.body}>
      <div className={styles.mainDiv}>
      <img className={styles.img} src={recipe.image} alt={recipe.title} />
      <h1 className={styles.text}>{recipe.title}</h1>
      <h3 className={styles.para2}>Ingredients:</h3>
      <ul className={styles.list}>
        {recipe.nutrition.ingredients.map((item)=>(
          <li className={styles.listItem}>
            {item.name}
          </li>
        ))}
      </ul>
      <MdFavoriteBorder onClick={handleAddToFavorites} className={styles.icon}/>
        <h3 className={styles.para3}>Add To Favorites</h3>
      <h3 className={styles.instruction}>Instruction</h3>
      <ol className={styles.ol}>
        {recipe.instructions.split(". ").map((item)=>(
      
        <li className={styles.para} dangerouslySetInnerHTML={{ __html: item}}>
          </li>
      ))}
      </ol>
      <p suppressHydrationWarning={true} className={styles.para4}> This Food Will Be Ready In {recipe.readyInMinutes} Minutes And Appropriate For {recipe.servings} People</p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const apiKey = 'b15461cfa5bc469aa1c0ac2cd3cba422';

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
    );
    const data = await response.json();
    console.log(data);

    return {
      props: {
        recipe: {
          readyInMinutes:data.readyInMinutes,
          servings:data.servings,
          id:data.id,
          title: data.title,
          image: data.image,
          instructions: data.instructions,
          nutrition:data.nutrition
        },
      },
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return {
      notFound: true,
    };
  }
};

export default RecipeDetail;

