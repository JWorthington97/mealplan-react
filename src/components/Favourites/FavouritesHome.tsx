import { Flex, HStack, Input, Select, Skeleton, Spacer, Text } from '@chakra-ui/react'
import ShowFavourites from './ShowFavourites'
import { useState, useEffect, useContext } from 'react'
import { ICuisine, IRecipeTags } from '../../Types';
import { RecipeTag } from '../Misc/RecipeTag';
import { IsLoadingContext } from '../../App';

export default function FavouritesHome(): JSX.Element {
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
  const isLoaded = useContext(IsLoadingContext) 

    // can extrapolate this out and share with recipes home instead. No need for 2 api calls 
    // then convert all the search, tags, cuisine into a component to share that too
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
      <Skeleton isLoaded={!isLoaded}>
        <Text ml={["2vw", "2vw", "2vw", "1vw", 0]} mt={["2", "2", "2", "2", "32px"]} mb="1" fontSize={["2xl", "3xl"]} fontWeight="bold">
          Favourites
        </Text>
        <Flex mx={["2vw", "2vw", "2vw", "1vw", 0]}>
          <Input placeholder="Search recipes..." w={["50vw", "50vw", "50vw", "50vw", "50%"]} variant="flushed" onChange={(e) => setRecipeSearch(e.target.value)}></Input>
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
        <HStack mx={["2vw", "2vw", "2vw", "1vw", 0]}
        my={["2vw", "2vw", "2vw", "2vw", "1em"]}>
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
        <ShowFavourites tagsChosen={tagsChosen} cuisineChosen={cuisineChosen} recipeSearch={recipeSearch} />
      </>
    )
}