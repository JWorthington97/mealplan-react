import { createStandaloneToast } from '@chakra-ui/react'
import { IRecipe, IRecipeFormatted } from '../../Types'

interface PostFavouritesProps {
  recipeID: number,
  userID: string,
  setRecipes?(recipes: IRecipeFormatted[]): void | undefined,
  setSpecials?(specials: IRecipe[]):void | undefined,
  recipes?: IRecipeFormatted[],
  specials?: IRecipe[]
}

type toastStatus = "success" | "info" | "warning" | "error" | undefined

export const postFavourites = async ({recipeID, userID, setRecipes, setSpecials, recipes, specials}: PostFavouritesProps) => {
    let toastMessage:{title: string, status: toastStatus} = {
      title: "Added to your favourites.",
      status: "success"
    }

    if (userID === "") { 
      toastMessage = {
        title: "Not signed in.",
        status: "warning"
      }
    }
    else {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favourites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({recipeID, userID})
        })

      const body = await response.json()    

      if (body.message.includes("duplicate")) {
        toastMessage = {
          title: "Already in your favourites!",
          status: "info"
        }
      }
      else {
        if (recipes && setRecipes) {
          const newRecipes = recipes
          .map((recipe) => recipe.id === recipeID ?
            ({...recipe, infavourites : recipe.infavourites ? false : true}) :
            {...recipe}
            )
          setRecipes(newRecipes)
        }
        else if (specials && setSpecials) {
          const newSpecials = specials
          .map((specials) => specials.id === recipeID ?
            ({...specials, infavourites : specials.infavourites ? false : true}) 
            : {...specials}
            )
          setSpecials(newSpecials)
        }
      }
    }

    const toast = createStandaloneToast()
    toast({
      title: toastMessage.title, 
      status: toastMessage.status,
      duration: 3000,
      isClosable: true,
    })
}