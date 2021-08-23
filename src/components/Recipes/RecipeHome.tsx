import { Flex, Input, Spacer, Heading, Grid, Select, Divider, HStack } from "@chakra-ui/react";

import ShowRecipes from "./ShowRecipes";
import ShowSpecials from "./ShowSpecials";
import { RecipeTag } from "../Misc/RecipeTag";
import { useState, useEffect } from "react";
import { IRecipeTags, ICuisine } from "../../Types";

export default function RecipeHome(): JSX.Element {
  const [cuisines, setCuisines] = useState<ICuisine[]>([]);
  const [cuisineChosen, setCuisineChosen] = useState<string>("");
  const [recipeSearch, setRecipeSearch] = useState("")
  const [tagsChosen, setTagsChosen] = useState<IRecipeTags>({
    easy: false,
    weeknight: false,
    vegetarian: false,
    vegan: false,
    leftovers: false,
  });
  
  useEffect(() => {
    const getCuisines = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cuisines`
      );
      const body = await response.json();
      setCuisines(body);
    };
    getCuisines();
  }, []);
   
  return (
    <>
      
      <ShowSpecials />
      <Divider orientation="horizontal" />
      <Heading textAlign="left" ml={["2vw", "2vw", "2vw", "1vw", 0]}> 
        Recipes
      </Heading>
      <Flex mx={["2vw", "2vw", "2vw", "1vw", 0]}>
        <Input placeholder="Search recipes..." w="50vw" onChange={(e) => setRecipeSearch(e.target.value)}></Input>
        <Spacer />
        <Select
          placeholder="All cuisines"
          w="40vw"
          onChange={(e) => setCuisineChosen(e.target.value)}
        >
          {cuisines.map((cuisine) => {
            return (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.cuisine[0].toUpperCase() +
                  cuisine.cuisine.substring(1)}
              </option>
            );
          })} 
        </Select>
      </Flex>
      <HStack mx={["2vw", "2vw", "2vw", "1vw", 0]}
      my={["2vw", "2vw", "2vw", "2vw", "1em"]}>
        {Object.keys(tagsChosen).map((tag) => {
          return (
            <RecipeTag
              key={tag}
              tagVariant={tag}
              isSelected={tagsChosen[tag]}
              onClick={() =>
                setTagsChosen({
                  ...tagsChosen,
                  [tag]: tagsChosen[tag] ? false : true,
                })
              }
            /> 
          );
        })}
      </HStack>
      <ShowRecipes tagsChosen={tagsChosen} cuisineChosen={cuisineChosen} recipeSearch={recipeSearch} />
    </>
  );
}