import { Grid, Box, Flex, Heading, IconButton, Image} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { GiMeal } from "react-icons/gi"
import { RiHeart2Line } from "react-icons/ri"
import { ICuisine, IRecipe, IRecipeFormatted, IRecipeTags } from "../../Types" 

export interface ShowRecipesProps {
    tagsChosen: IRecipeTags,
    cuisineChosen: string
}

export default function ShowRecipes({tagsChosen, cuisineChosen}: ShowRecipesProps): JSX.Element {
    const [recipes, setRecipes] = useState<IRecipeFormatted[]>([])

    useEffect(() => {
        const getRecipes = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
            const body = await response.json()
            const formatted: IRecipeFormatted[] = body.map((recipe: IRecipe) => {
                return {...recipe, tags: recipe.tags.split(", ")}
            })
            setRecipes(formatted)
        }
        getRecipes()
    }, []) 



    const trueTags = Object.keys(tagsChosen)
    .filter((chosenTag) => tagsChosen[chosenTag])

    console.log(recipes[0])

    return ( 
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            
        {recipes
        // Filtering on Cuisine
        .filter((recipe) => recipe.cuisine === cuisineChosen)
        // Filtering on Tags
        .filter((recipe) => recipe.tags
            .filter(tag => trueTags 
            .includes(tag)).length > 0 || trueTags.length === 0)
        // Mapping over fully filtered recipes
        .map((recipe) => {
            return <Box key={recipe.id}>
                <Box w="40vw" m="auto">
                {/* div with background image set instead */}
                    <Image src={recipe.image_url} boxSize="40vw" boxShadow="lg" objectFit="cover" borderRadius="10"></Image>
                    <Flex>
                        <Heading fontSize="sm">{recipe.name}</Heading> 
                        <Flex m="1vw">
                            <IconButton aria-label="Add to favourites" backgroundColor="mediumorchid" icon={<RiHeart2Line/>} size="sm" mr="1vw" />
                            <IconButton aria-label="Add to mealplan" backgroundColor="teal" icon={<GiMeal color="#66CCB5"/>} size="sm"  />
                        </Flex> 
                    </Flex>
                </Box> 
            </Box>
        })}
    </Grid> 
    )
 
} 