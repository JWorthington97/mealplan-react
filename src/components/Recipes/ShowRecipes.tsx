import { Box, Flex, Text, Image, SimpleGrid, Skeleton, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { ShowRecipesProps } from "../../Types";
import FavouritesButton from "../Favourites/FavouritesButton";
import { titleCase } from "title-case";
import { IsLoadingContext, RecipesContext } from "../../App";
import { GiMeal } from "react-icons/gi";

export default function ShowRecipes({
  tagsChosen,
  cuisineChosen,
  recipeSearch,
}: ShowRecipesProps): JSX.Element {
  // const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]);
  const isLoaded = useContext(IsLoadingContext);
  const { recipes, setRecipes } = useContext(RecipesContext);

  const trueTags = Object.keys(tagsChosen).filter(
    (chosenTag) => tagsChosen[chosenTag]
  );

  return (
    <SimpleGrid
      minChildWidth={["45vw", "45vw", "30vw", "20vw", "10vw"]}
      m={["2vw", "2vw", "2vw", "1vw", "1"]}
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
            <Box key={recipe.id}>
              <Skeleton isLoaded={!isLoaded}>
                <Box w={["45vw", "45vw", "30vw", "20vw", "10vw"]} m="auto" position="relative">
                  <Box w="inherit" position="absolute" textAlign="right" p="1" >
                    <IconButton  
                    borderWidth="1px"
                    borderColor="grey"
                        boxShadow="xl"
                        aria-label="Add to mealplan"   
                        backgroundColor="#fefefb"
                        icon={<GiMeal color="#66CCB5"/>} 
                        size="sm"
                      /> 
                  </Box>                  
                  <Image
                    src={recipe.image_url}
                    fallbackSrc={
                      "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"
                    }
                    alt={recipe.name}
                    boxSize={["45vw", "45vw", "30vw", "20vw", "10vw"]}
                    boxShadow="lg"
                    objectFit="cover"
                    borderTopRadius="10"
                    cursor="pointer"
                    onClick={() => window.open(recipe.url)}
                  ></Image>
                  <Flex justifyContent="space-between" mt={2} mb={4}>
                    <Text
                      fontSize={["sm", "xl", "lg", "2xl", "md"]}
                      lineHeight={1.25}
                    >
                      {titleCase(recipe.name)}
                    </Text>
                    {/* <Flex m={["1vw", "1vw", "1vw", "1vw", "2%"]}> */}
                    <FavouritesButton
                      recipe={recipe}
                      setRecipes={setRecipes}
                      recipes={recipes}
                    />
                    {/* <IconButton
                      aria-label="Add to mealplan"   
                      // backgroundColor="teal"
                      icon={<GiMeal color="#66CCB5" />} 
                      size="sm"
                    /> */}
                    {/* </Flex> */}
                  </Flex>
                </Box>
              </Skeleton>
            </Box>
          );
        })}
    </SimpleGrid>
  );
}
