import { IconButton, useToast } from "@chakra-ui/react";
import { RiHeart2Line } from "react-icons/ri";
import { postFavourites } from "../Favourites/postFavourites";
import { IRecipeFormatted } from "../../Types";
import { RecipesContext, UserContext } from "../../App";
import { useContext } from "react";

interface FavouritesButtonProps {
  recipe: IRecipeFormatted;
  // recipes: IRecipeFormatted[];
  // setRecipes(recipes: IRecipeFormatted[]): void;
}

export default function FavouritesButton({
  recipe,
  // setRecipes,
  // recipes
}: FavouritesButtonProps): JSX.Element {
  const { id, infavourites } = recipe;
  const user = useContext(UserContext);
  const toast = useToast();
  const { recipes, setRecipes } = useContext(RecipesContext)

  return (
    <IconButton
      aria-label="Add to favourites"
      icon={<RiHeart2Line />}
      color={infavourites ? "red" : "black"}
      size="sm"
      mr={["1vw", "1vw", "1vw", "1vw", "2%"]}
      onClick={() => {
        user 
          ? postFavourites({
              recipeID: id,
              userID: user?.uid || "",
              setRecipes,
              recipes,
            })
          : toast({
              title: "Not signed in.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
      }}
    />
  );
}
