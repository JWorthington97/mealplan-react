import { IconButton, useToast } from "@chakra-ui/react";
import { RiHeart2Line } from "react-icons/ri";
import firebase from "firebase";
import { useState } from "react";
import { postFavourites } from '../Favourites/postFavourites'

interface FavouritesButtonProps {
    recipeId: number
}

export default function FavouritesButton({recipeId}: FavouritesButtonProps): JSX.Element {
    const user = firebase.auth().currentUser
    const toast = useToast()

    return <IconButton
        aria-label="Add to favourites"
        backgroundColor="mediumorchid"  
        icon={<RiHeart2Line />}
        size="sm" 
        mr="1vw"
        onClick={() => {user ? 
            postFavourites({
                recipeID:recipeId, 
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

