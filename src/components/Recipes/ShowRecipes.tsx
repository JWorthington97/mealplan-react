import { Box, Flex, Text, IconButton, Image, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { GiMeal } from "react-icons/gi";
import { IRecipe, IRecipeFormatted, ShowRecipesProps } from "../../Types";
import firebase from "firebase";
import FavouritesButton from "../Favourites/FavouritesButton";
import { titleCase } from "title-case";
import { IsLoadingContext } from "../../App";

export default function ShowRecipes({
  tagsChosen,
  cuisineChosen,
  recipeSearch
}: ShowRecipesProps): JSX.Element {
  const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]);

  // pass set reicpes as prop and update locally to force a rerender for time being
  let isLoaded = useContext(IsLoadingContext)

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${firebase.auth().currentUser?.uid}` 
      );
      const body = await response.json();
      const formatted: IRecipeFormatted[] = body.map((recipe: IRecipe) => {
        return { ...recipe, tags: recipe.tags.split(", ") };
      });
      setRecipes(formatted);
    };
    getRecipes();
  }, [isLoaded]);

  console.log(recipes)

  const trueTags = Object.keys(tagsChosen).filter(
    (chosenTag) => tagsChosen[chosenTag]
  );

  return (
    <SimpleGrid 
    minChildWidth={["45vw", "45vw", "30vw", "30vw", "10vw"]}
    m={["2vw", "2vw", "2vw", "1vw", "1" ]}
    >
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
            <Skeleton isLoaded={!isLoaded}>
            <Box key={recipe.id}>
              <Box w={["45vw", "45vw", "30vw", "30vw", "10vw"]} m="auto">
                <div style={{backgroundImage:"url(https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg)",  backgroundSize:"cover", backgroundPosition:"center"}}>
                <Image
                  src={recipe.image_url}
                  boxSize={["45vw", "45vw", "30vw", "30vw", "10vw"]} 
                  boxShadow="lg" 
                  objectFit="cover"
                  borderTopRadius="10"
                  cursor="pointer"
                  onClick={() => window.open(recipe.url)}
                ></Image>
                </div>
                <Flex>
                  <Text fontSize={["sm", "xl", "lg", "2xl", "md"]} lineHeight={1.25} mt={2} mb={4}>{titleCase(recipe.name)}</Text>
                  <Flex m={["1vw", "1vw", "1vw", "1vw", "2%"]}>
                    <FavouritesButton recipe={recipe} setRecipes={setRecipes} recipes={recipes}
                    /> 
                    <IconButton
                      aria-label="Add to mealplan"   
                      // backgroundColor="teal"
                      icon={<GiMeal color="#66CCB5" />} 
                      size="sm"
                    />
                  </Flex>
                </Flex> 
              </Box>
            </Box>
            </Skeleton>
          );
        })}
    </SimpleGrid>
  );
}
