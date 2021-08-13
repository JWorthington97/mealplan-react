import {
    Flex,
    Input, 
    Spacer,
    Heading,
    Grid,
    Select,
  } from "@chakra-ui/react"

import ShowRecipes from "./ShowRecipes"
import ShowSpecials from "./ShowSpecials"
import { RecipeTag } from "../Misc/RecipeTag"
import { useState, useEffect } from "react"
import { IRecipeTags, ICuisine } from "../../Types"

export default function RecipeHome(): JSX.Element {
    const [tagsChosen, setTagsChosen] = useState<IRecipeTags>({
        easy: false,
        weeknight: false,
        vegetarian: false,
        vegan: false,
        leftovers: false 
    }) 
    const [cuisines, setCuisines] = useState<ICuisine[]>([])
    const [cuisineChosen, setCuisineChosen] = useState<string>("")

    useEffect(() => {
        const getCuisines = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cuisines`)
            const body = await response.json()
            setCuisines(body)
        };
        getCuisines()
    }, [])
     
    return <>
        <ShowSpecials />
        <Heading textAlign="left" ml="2vw">Recipes</Heading>
        <Flex mx="2vw">
            <Input placeholder="Search recipes..." size="xs" w="50vw"></Input> 
            <Spacer />
            {/* Need to fetch cuisines */}
            <Select placeholder="All cuisines" size="xs" w="40vw" onChange={(e) => setCuisineChosen(e.target.value)}> 
                {cuisines.map((cuisine) => {
                    return <option key={cuisine.id} value={cuisine.id}>{cuisine.cuisine[0].toUpperCase() + cuisine.cuisine.substring(1)}</option>})}
            </Select>
        </Flex>
        <Grid my="2vw" overflowX="auto" gridAutoFlow="column">
            {Object.keys(tagsChosen).map((tag) => {
                return <RecipeTag key={tag} tagVariant={tag} isSelected={tagsChosen[tag]} 
                onClick={() => setTagsChosen({
                    ...tagsChosen, 
                    [tag]: tagsChosen[tag] ? false : true})}
                    />
            })}               
        </Grid> 
        <ShowRecipes tagsChosen={tagsChosen} cuisineChosen={cuisineChosen}/>    
    </>
}    

