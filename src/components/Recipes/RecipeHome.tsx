import {
    Flex,
    Input, 
    Select,
    Spacer,
    Tag,
    Heading,
  } from "@chakra-ui/react"

import ShowRecipes from "./ShowRecipes"
import ShowSpecials from "./ShowSpecials"


export default function RecipeHome(): JSX.Element {
    return <>
    {/* Weekly specials move to another function */}
    <ShowSpecials />
    <Heading textAlign="left" ml="2vw">Recipes</Heading>
    <Flex mx="2vw">
        <Input placeholder="Search recipes..." size="xs" w="50vw"></Input>
        <Spacer />
        {/* <Select placeholder="Select cuisine" size="xs" w="40vw"> 
            {testCuisines.map((cuisine) => {
                return <option value={cuisine.id}>{cuisine.cuisine}</option>})}
        </Select> */}
    </Flex>
    <Flex my="2vw" overflowX="scroll">
        {/* Look at use outside click */}
        <Tag mx="1vw" backgroundColor="crimson" color="white" fontWeight="bold" fontSize="xs">Easy</Tag> 
        <Tag mx="1vw" backgroundColor="gold" fontWeight="bold" fontSize="xs">Weeknight</Tag>
        <Tag mx="1vw" backgroundColor="mediumseagreen" color="white" fontWeight="bold" fontSize="xs">Vegetarian</Tag>
        <Tag mx="1vw" backgroundColor="steelblue" color="white" fontWeight="bold" fontSize="xs">Vegan</Tag>
        <Tag mx="1vw" backgroundColor="darkmagenta" color="white" fontWeight="bold" fontSize="xs">Leftovers</Tag>
    </Flex>
    <ShowRecipes />
        
    </>
}   

