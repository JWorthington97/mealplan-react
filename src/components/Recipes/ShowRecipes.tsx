import { Grid, Box, Flex, Heading, IconButton, Image} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { GiMeal } from "react-icons/gi"
import { RiHeart2Line } from "react-icons/ri"
import { IRecipe } from "../../Types" 

export default function ShowRecipes(): JSX.Element {
    const [recipes, setRecipes] = useState<IRecipe[]>([])

    useEffect(() => {
        const getRecipes = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
            const body = await response.json()
            setRecipes(body)
        }
        getRecipes()
    }, [])
    
    console.log(recipes) 
    
    
    return ( 
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {recipes.map((recipe) => {
            return <Box key={recipe.id}>
                <Box w="40vw" m="auto">
                {/* div with background image set instead */}
                    <Image src={recipe.image_url} boxSize="40vw" objectFit="cover" borderRadius="10"></Image>
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