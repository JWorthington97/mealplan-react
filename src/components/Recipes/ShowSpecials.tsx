import { Grid, Box, Flex, Heading, IconButton, Tag, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { GiMeal } from 'react-icons/gi'
import { RiHeart2Line } from 'react-icons/ri'
import { IRecipe } from '../../Types'

export default function ShowSpecials(): JSX.Element {
    const [specials, setSpecials] = useState<IRecipe[]>([])
    useEffect(() => {
        const getSpecials = async () => {
            console.log(`${process.env.REACT_APP_BACKEND_URL}/specials`)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/specials`)
            const body = await response.json()
            setSpecials(body)
        }
        getSpecials() 
        
    }, [])

    return <Grid overflowX="auto" gridAutoFlow="column">
    {specials.map((recipe) => {
        return <Box w="40vw" m="2vw" key={recipe.id}>
            <Image src={recipe.image_url} boxSize="40vw" objectFit="cover" borderRadius="10"></Image>
            <Flex>
                <Heading fontSize="sm">{recipe.name}</Heading>
                <Flex m="1vw">
                    <IconButton aria-label="Add to favourites" backgroundColor="mediumorchid" icon={<RiHeart2Line/>} size="sm" mr="1vw" />
                    <IconButton aria-label="Add to mealplan" backgroundColor="teal" icon={<GiMeal color="#66CCB5" />} size="sm"  />
                </Flex>
            </Flex>
            {recipe.tags.split(", ").map((tag) => {
               return <Tag key={tag} size="sm" fontSize="xs" fontWeight="bold" m="1vw" backgroundColor="lightseagreen">{tag}</Tag>
            })}
        </Box> 
    })}
</Grid>
}