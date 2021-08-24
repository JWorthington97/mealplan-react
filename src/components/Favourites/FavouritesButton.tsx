import { IconButton, useToast } from "@chakra-ui/react";
import { RiHeart2Line } from "react-icons/ri";
import firebase from "firebase";
import { postFavourites } from '../Favourites/postFavourites'
import { IRecipeFormatted } from "../../Types";

interface FavouritesButtonProps {
    recipe: IRecipeFormatted
}

export default function FavouritesButton({recipe}: FavouritesButtonProps): JSX.Element {
    const { id, infavourites } = recipe
    const user = firebase.auth().currentUser
    const toast = useToast()

    if (recipe.id === 2) {
        console.log(recipe)
    }
   

    return <IconButton
        aria-label="Add to favourites"
        // backgroundColor="mediumorchid"  
        icon={<RiHeart2Line />}
        color={infavourites ? "red" : "black"}
        size="sm" 
        mr={["1vw", "1vw", "1vw", "1vw", "2%" ]}
        onClick={() => {user ? 
            postFavourites({
                recipeID: id, 
                userID: firebase.auth().currentUser?.uid || ""// NEED TO CHANGE THIS, "" is bad
                }) 
            : toast({
                title: "Not signed in.",
                status: "warning", 
                duration: 3000,
                isClosable: true,
              })
        }} 
    />
}

