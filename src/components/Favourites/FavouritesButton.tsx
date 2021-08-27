import { IconButton, useToast } from "@chakra-ui/react";
import { RiHeart2Line } from "react-icons/ri";
import postFavourites from "../Favourites/postFavourites";
import { IRecipeFormatted } from "../../Types";
import { RecipesContext, UserContext } from "../../App";
import { useContext } from "react";
import deleteFavourites from "./deleteFavourites";

interface FavouritesButtonProps {
  recipe: IRecipeFormatted;
}

export default function FavouritesButton({
  recipe,
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
        if (user) {
          if (infavourites === 0) {
            postFavourites({
              recipeID: id,
              userID: user?.uid || "",
              setRecipes,
              recipes,
            })
          }
          else {
            deleteFavourites({
              recipeID: id,
              userID: user?.uid || "", 
              setRecipes,
              recipes,
            })
          }
        } 
        else {
          toast({
            title: "Not signed in.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }}
    />
  );
}
