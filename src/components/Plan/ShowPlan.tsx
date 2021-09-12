import { Skeleton, Box, Image, Flex, Text, SimpleGrid, Select} from "@chakra-ui/react";
import { useContext } from "react";
import { IsLoadingContext, RecipesContext, UserContext } from "../../App";
import FavouritesButton from "../Favourites/FavouritesButton";
import PlanButton from "./PlanButton";
import { titleCase } from "title-case";
import { RecipeTag } from "../Misc/RecipeTag";
import patchPlanDay from "./patchPlanDay";

export default function ShowPlan(): JSX.Element {
  const isLoaded = useContext(IsLoadingContext);
  const { recipes, setRecipes } = useContext(RecipesContext)
  const user = useContext(UserContext)

  return (
    <Skeleton isLoaded={!isLoaded}>
      <SimpleGrid
      minChildWidth={["45vw", "45vw", "30vw", "20vw", "10vw"]}
      m={["2vw", "2vw", "2vw", "1vw", "1"]}
    >
        {recipes 
        .filter((recipe) => recipe.inplan === 1)
        .sort((a, b) => a.day - b.day)  
        .map((recipe) => {
          return ( 
            <Box
              w={["45vw", "45vw", "30vw", "20vw", "10vw"]}
              m={["2vw", "2vw", "2vw", "1vw", "1"]}
              key={recipe.id}
              position="relative" 
            > 
              <Select 
              defaultValue={recipe.day}
              mb="1"
              variant="flushed" 
              borderBottomColor="black"  
              borderBottomWidth="1"
              onChange={(e) => {setRecipes(recipes.map((mapRecipe) => {
                if (mapRecipe.id === recipe.id) {
                  return {...mapRecipe, day: parseInt(e.target.value)}
                }
                else { 
                  return mapRecipe
                }
              }));
              patchPlanDay(parseInt(e.target.value), recipe.id, user?.uid || "")}}
              >
                <option value="8">Choose day...</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
                </Select>
              <Box w="inherit" position="absolute" textAlign="right" p="1" >
                
                  <PlanButton recipe={recipe} />
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
              <Flex justifyContent="space-between" mt={2} mb={1}>
                <Text
                  fontSize={["sm", "xl", "lg", "2xl", "md"]}
                  lineHeight={1.25}
                >
                  {titleCase(recipe.name)}
                </Text>
                <FavouritesButton
                  recipe={{ ...recipe, cuisine: 0, tags: [] }}
     
                />
              </Flex>
              <Flex flexWrap="wrap">
                {recipe.tags
                  .sort()
                  .map((tag) => {
                    return (
                      <RecipeTag
                        tagVariant={tag}
                        key={tag}
                        isSelected={true}
                        mr={0.5}
                        mb={0.5}
                      />
                    );
                  })}
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Skeleton>
  );
}