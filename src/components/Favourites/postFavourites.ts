import { createStandaloneToast } from '@chakra-ui/react'

interface PostFavouritesProps {
  recipeID: number,
  userID: string
}

type toastStatus = "success" | "info" | "warning" | "error" | undefined

export const postFavourites = async ({recipeID, userID}: PostFavouritesProps) => {
    if (userID === "") { 
      window.alert("Not signed in postFavourites.tsx")
      return
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({recipeID, userID})
      })

    const body = await response.json()

    let toastMessage:{title: string, status: toastStatus} = {
      title: "Added to your favourites.",
      status: "success"
    }

    if (body.message.includes("duplicate")) {
      toastMessage = {
        title: "Already in your favourites!",
        status: "info"
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