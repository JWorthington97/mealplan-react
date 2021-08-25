import { IconButton, useToast } from "@chakra-ui/react";
import { RiHeart2Line } from "react-icons/ri";
import { postFavourites } from '../Favourites/postFavourites'
import { IRecipe, IRecipeFormatted } from "../../Types";
import { UserContext } from "../../App";
import { useContext } from "react";

interface FavouritesButtonProps {
    recipe: IRecipeFormatted,
    setRecipes?(recipes: IRecipeFormatted[]): void | undefined,
    setSpecials?(specials: IRecipe[]):void | undefined,
    recipes?: IRecipeFormatted[] | undefined,
    specials?: IRecipe[] | undefined
}

export default function FavouritesButton({recipe, setRecipes, setSpecials, recipes, specials}: FavouritesButtonProps): JSX.Element {
    const { id, infavourites } = recipe
    const user = useContext(UserContext)
    const toast = useToast()

    return <IconButton
        aria-label="Add to favourites" 
        icon={<RiHeart2Line />}
        color={infavourites ? "red" : "black"}
        size="sm" 
        mr={["1vw", "1vw", "1vw", "1vw", "2%" ]}
        onClick={() => {user ? 
            postFavourites({
                recipeID: id, 
                userID: user?.uid || "",
                setRecipes,
                setSpecials,
                recipes,
                specials
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

