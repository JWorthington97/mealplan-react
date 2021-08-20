export const postFavourites = async (recipeID: number, userID: string) => {
    if (userID === "") {
      window.alert("Error")
      return
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({recipeID, userID})
      })
    
    if (response.status === 201) {
        window.alert("Favourite added!")
    }
}