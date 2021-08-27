import { Grid, Box, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { IRecipe } from "../../Types";
import FavouritesButton from "../Favourites/FavouritesButton";
import { RecipeTag } from "../Misc/RecipeTag";
import { titleCase } from "title-case";
import { IsLoadingContext, UserContext } from "../../App";

export default function ShowSpecials(): JSX.Element {
  const [specials, setSpecials] = useState<IRecipe[]>([]);
  const isLoaded = useContext(IsLoadingContext);
  const user = useContext(UserContext);

  useEffect(() => {
    const getSpecials = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/specials/${user?.uid}`
      );
      const body = await response.json();
      setSpecials(body);
    };
    getSpecials();
  }, [isLoaded, user]);

  return (
    <Skeleton isLoaded={!isLoaded}>
      <Grid overflowX="auto" gridAutoFlow="column">
        {specials.map((recipe) => {
          return (
            <Box
              w={["45vw", "45vw", "30vw", "20vw", "10vw"]}
              m={["2vw", "2vw", "2vw", "1vw", "1"]}
              key={recipe.id}
            >
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
                  setSpecials={setSpecials}
                  specials={specials}
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
                  .split(", ")
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
