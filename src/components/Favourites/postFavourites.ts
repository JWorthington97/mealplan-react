interface PostFavouritesProps {
  recipeID: number,
  userID: string,
  setPostFavouriteStatus(postFavouriteStatus: number): void
}

export const postFavourites = async ({recipeID, userID, setPostFavouriteStatus}: PostFavouritesProps) => {
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
  
    if (response.status === 201) {
        window.alert("Favourite added!")
    }
    else {
      // window.alert("Already in your favourites!")
      window.alert(body.message)
    } 
}