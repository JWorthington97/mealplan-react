import {
  Flex,
  Input,
  Spacer,
  Select,
  Divider,
  HStack,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import ShowRecipes from "./ShowRecipes";
import ShowSpecials from "./ShowSpecials";
import { RecipeTag } from "../Misc/RecipeTag";
import { useState, useContext } from "react";
import { IRecipeTags } from "../../Types";
import { CuisinesContext, IsLoadingContext } from "../../App";

export default function RecipeHome(): JSX.Element {
  const [cuisineChosen, setCuisineChosen] = useState<string>("");
  const [recipeSearch, setRecipeSearch] = useState("");
  const [tagsChosen, setTagsChosen] = useState<IRecipeTags>({
    easy: false,
    weeknight: false,
    vegetarian: false,
    vegan: false,
    leftovers: false,
  });

  const isLoaded = useContext(IsLoadingContext);
  const cuisines = useContext(CuisinesContext);

  return (
    <>
      <Skeleton isLoaded={!isLoaded}>
        <Text
          ml={["2vw", "2vw", "2vw", "1vw", 0]}
          mt={["2", "2", "2", "2", "32px"]}
          mb="1"
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
        >
          Weekly Picks
        </Text>
      </Skeleton>
      <ShowSpecials />
      <Divider orientation="horizontal" />
      <Skeleton isLoaded={!isLoaded}>
        <Text
          ml={["2vw", "2vw", "2vw", "1vw", 0]}
          mt={["2", "2", "2", "2", "32px"]}
          mb="1"
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
        >
          Recipes
        </Text>
        <Flex mx={["2vw", "2vw", "2vw", "1vw", 0]}>
          <Input
            placeholder="Search recipes..."
            w={["50vw", "50vw", "50vw", "50vw", "50%"]}
            variant="flushed"
            onChange={(e) => setRecipeSearch(e.target.value)}
          ></Input>
          <Spacer />
          <Select
            placeholder="All cuisines"
            w={["40vw", "40vw", "30vw", "30vw", "30%"]}
            variant="flushed"
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
        <HStack
          mx={["2vw", "2vw", "2vw", "1vw", 0]}
          my={["2vw", "2vw", "2vw", "2vw", "1em"]}
          overflowX="auto"
        >
          {Object.keys(tagsChosen).map((tag) => {
            return (
              <RecipeTag
                key={tag}
                tagVariant={tag}
                isSelected={tagsChosen[tag]}
                cursor="pointer"
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
      </Skeleton>
      <ShowRecipes
        tagsChosen={tagsChosen}
        cuisineChosen={cuisineChosen}
        recipeSearch={recipeSearch}
      />
    </>
  );
}
