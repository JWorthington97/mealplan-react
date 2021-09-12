import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { PostAndDeleteFavouritesProps } from "../../Types";

type toastStatus = "success" | "info" | "warning" | "error" | undefined;

export default async function deleteFavourites({
    recipeID,
    userID,
    setRecipes,
    recipes,
  }: PostAndDeleteFavouritesProps) {
    let toastMessage: { title: string; status: toastStatus } = {
        title: "Removed from your favourites.",
        status: "success",
      };

    if (userID === "") {
        toastMessage = {
          title: "Not signed in.",
          status: "warning",
        };
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/favourites`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipeID, userID }),
          }
        );
    
        if (response.status !== 200) {
            toastMessage = {
                title: "Unable to remove from favourites",
                status: "error",
              };
        }
        else {
            const newRecipes = recipes!.map((recipe) =>
          recipe.id === recipeID
            ? { ...recipe, infavourites: recipe.infavourites ? 0 : 1 }
            : { ...recipe }
        );
      setRecipes!(newRecipes);
        }
    }

    const toast = createStandaloneToast({theme: theme});
    toast({
        title: toastMessage.title,
        status: toastMessage.status,
        duration: 3000,
        isClosable: true,
    });
}