import { IconButton, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { GiCheckMark } from 'react-icons/gi'
import { RecipesContext, UserContext } from "../../App"; 
import { IRecipeFormatted } from "../../Types";
import postPlanRecipe from "./postPlanRecipe";
import deletePlanRecipe from "./deletePlanRecipe";

interface PlanRecipesProps {
    recipe: IRecipeFormatted
}
export default function PlanRecipes({ recipe } : PlanRecipesProps): JSX.Element {
    const user = useContext(UserContext)
    const toast = useToast();
    const { id, inplan } = recipe
    const { recipes, setRecipes } = useContext(RecipesContext)
 
    return <IconButton  
        aria-label="Add to mealplan" 
        icon={recipe.inplan ? <GiCheckMark /> : <GoPlus />}   
        size="sm" 
        borderWidth="1px"
        borderColor="grey"
        boxShadow="xl"
        color={recipe.inplan ? "primary" : "black"} 
        backgroundColor="#fefefb"
        onClick={() => {
            if (user) {
              if (inplan === 0) {
                postPlanRecipe({
                  recipeID: id,
                  userID: user?.uid || "", 
                  setRecipes,
                  recipes,
                })
              }
              else {
                deletePlanRecipe({
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
}