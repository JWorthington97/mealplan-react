import { Grid, Box, Flex, Text, Image, Skeleton, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import FavouritesButton from "../Favourites/FavouritesButton";
import { RecipeTag } from "../Misc/RecipeTag";
import { titleCase } from "title-case";
import { IsLoadingContext, RecipesContext } from "../../App";
import { GiMeal } from "react-icons/gi";

export default function ShowSpecials(): JSX.Element {
  const isLoaded = useContext(IsLoadingContext);
  // const { specials, setSpecials } = useContext(SpecialsContext) 
  const { recipes } = useContext(RecipesContext)

  return (
    <Skeleton isLoaded={!isLoaded}>
      <Grid overflowX="auto" gridAutoFlow="column">
        {recipes
        .filter((recipe) => recipe.specials === 1)
        .map((recipe) => {
          return (
            <Box
              w={["45vw", "45vw", "30vw", "20vw", "10vw"]}
              m={["2vw", "2vw", "2vw", "1vw", "1"]}
              key={recipe.id}
              position="relative" 
            >
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
                {/* <IconButton
                    aria-label="Add to mealplan"
                    // backgroundColor="teal"
                    icon={<GiMeal color="#66CCB5" />} 
                    size="sm"
                  /> */}
                {/* </Flex> */}
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
      </Grid>
    </Skeleton>
  );
}
