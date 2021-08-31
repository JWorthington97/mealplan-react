import { createStandaloneToast } from "@chakra-ui/react";
import { PostAndDeleteFavouritesProps } from "../../Types"; 

type toastStatus = "success" | "info" | "warning" | "error" | undefined;

export default async function postPlanRecipe({
  recipeID,
  userID,
  setRecipes,
  recipes,
}: PostAndDeleteFavouritesProps) {
  let toastMessage: { title: string; status: toastStatus } = {
    title: "Added to your plan.",
    status: "success",
  };

  if (userID === "") {
    toastMessage = {
      title: "Not signed in.",
      status: "warning",
    };
  } else {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeID, userID }),
      }
    );

    // const body = await response.json();

    // if (body.message.includes("duplicate")) {
    //   toastMessage = {
    //     title: "Already in your favourites!", 
    //     status: "info",
    //   };
    // } else {
    //   const newRecipes = recipes!.map((recipe) =>
    //       recipe.id === recipeID
    //         ? { ...recipe, infavourites: recipe.infavourites ? 0 : 1 }
    //         : { ...recipe }
    //     );
    //   setRecipes!(newRecipes);
    // }
    if (response.status === 201) {
        const newRecipes = recipes!.map((recipe) =>
          recipe.id === recipeID
            ? { ...recipe, inplan: recipe.inplan ? 0 : 1 }
            : { ...recipe }
        );
        setRecipes!(newRecipes);
    }
    else {
        toastMessage = {
        title: "Error adding to plan", 
        status: "warning",
      };
    }
  }

  const toast = createStandaloneToast();
  toast({
    title: toastMessage.title,
    status: toastMessage.status,
    duration: 3000,
    isClosable: true,
  });
};
