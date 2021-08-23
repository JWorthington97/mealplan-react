import { Grid, Box, Flex, Heading, IconButton, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GiMeal } from "react-icons/gi";
import { IRecipe, IRecipeFormatted, ShowRecipesProps } from "../../Types";
// import firebase from "firebase";
import FavouritesButton from "../Favourites/FavouritesButton";

export default function ShowRecipes({
  tagsChosen,
  cuisineChosen,
  recipeSearch
}: ShowRecipesProps): JSX.Element {
  const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]);
  // const user = firebase.auth().currentUser

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/recipes`
      );
      const body = await response.json();
      const formatted: IRecipeFormatted[] = body.map((recipe: IRecipe) => {
        return { ...recipe, tags: recipe.tags.split(", ") };
      });
      setRecipes(formatted);
    };
    getRecipes();
  }, []);

  const trueTags = Object.keys(tagsChosen).filter(
    (chosenTag) => tagsChosen[chosenTag]
  );



  return (
    <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]} m={["2vw", "2vw", "2vw", "1vw", "1" ]} gap={3}>
      {recipes
        // Filtering on Cuisine
        .filter(
          (recipe) =>
            recipe.cuisine === parseInt(cuisineChosen) || cuisineChosen === ""
        )
        // Filtering on Tags
        .filter(
          (recipe) => 
            recipe.tags.filter((tag) => trueTags.includes(tag)).length ===
              trueTags.length || trueTags.length === 0
        )
        // Filtering on search
        .filter((recipe) => recipe.name.includes(recipeSearch))
        // Mapping over fully filtered recipes
        .map((recipe) => {
          return (
            <Box key={recipe.id}>
              <Box w={["45vw", "45vw", "30vw", "30vw", "10vw"]} m="auto">
                {/* div with background image set instead */}
                <Image
                  src={recipe.image_url}
                  boxSize={["45vw", "45vw", "30vw", "30vw", "10vw"]}
                  boxShadow="lg" 
                  objectFit="cover"
                  borderTopRadius="10"
                  onClick={() => window.open(recipe.url)}
                ></Image>
                <Flex>
                  <Heading fontSize="sm">{recipe.name}</Heading>
                  <Flex m="1vw">
                    <FavouritesButton recipeId={recipe.id} 
                    // postFavourites={postFavourites} 
                    /> 
                    <IconButton
                      aria-label="Add to mealplan"   
                      backgroundColor="teal"
                      icon={<GiMeal color="#66CCB5" />} 
                      size="sm"
                    />
                  </Flex>
                </Flex>
              </Box>
            </Box>
          );
        })}
    </Grid>
  );
}
