import { Grid, Box, Flex, Heading, IconButton, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GiMeal } from "react-icons/gi";
import { IRecipe } from "../../Types";
import FavouritesButton from "../Favourites/FavouritesButton";
import { RecipeTag } from "../Misc/RecipeTag";

export default function ShowSpecials(): JSX.Element {
  const [specials, setSpecials] = useState<IRecipe[]>([]);
  useEffect(() => {
    const getSpecials = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/specials`
      );
      const body = await response.json();
      setSpecials(body);
    };
    getSpecials();
  }, []);

  return (
    <Grid overflowX="auto" gridAutoFlow="column">
      {specials.map((recipe) => {
        return (
          <Box w={["45vw", "45vw", "30vw", "30vw", "10vw"]} 
            m={["2vw", "2vw", "2vw", "1vw", "1" ]} 
            key={recipe.id} >
            <Image
              src={recipe.image_url}
              boxSize={["45vw", "45vw", "30vw", "30vw", "10vw"]}
              boxShadow="lg"
              objectFit="cover"
              borderTopRadius="10"
              cursor="pointer"
              onClick={() => window.open(recipe.url)} 
            ></Image>
            <Flex>
              <Heading fontSize={["sm", "xl", "xl", "3xl", "xl"]}>{recipe.name}</Heading>
              <Flex m={["1vw", "1vw", "1vw", "1vw", "2%"]}>
              <FavouritesButton recipeId={recipe.id}/> 
                <IconButton
                  aria-label="Add to mealplan"
                  backgroundColor="teal"
                  icon={<GiMeal color="#66CCB5" />}
                  size="sm"
                />
              </Flex>
            </Flex>
            <Flex flexWrap="wrap">
              {recipe.tags
                .split(", ")
                .sort()
                .map((tag) => {
                  return (
                    <RecipeTag tagVariant={tag} key={tag} isSelected={true} />
                  );
                })}
            </Flex>
          </Box>
        );
      })}
    </Grid>
  );
}
