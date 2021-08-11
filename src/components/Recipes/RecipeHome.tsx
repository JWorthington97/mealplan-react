import {
    IconButton,
    Flex,
    Input, 
    Select,
    Spacer,
    Tag,
    Box,
    Image,
    Grid,
    Heading,
  } from "@chakra-ui/react"

import { RiHeart2Line } from 'react-icons/ri'
import { GiMeal } from 'react-icons/gi'

const testData = [
    {
        name: "Gong Bao Chicken",
        cuisine: "Chinese",
        tags: ["Weeknight", "Easy"],
        img:"https://realfood.tesco.com/media/images/Gong-bao-chicken-1400x919-6376346b-85c1-4365-bfe8-54ac7bca9913-0-1400x919.jpg"
    },
    {
        name: "Steak and Ale Pie",
        cuisine: "British",
        tags: ["Leftovers"],
        img: "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2018/06/Hairy-Bikers%E2%80%99-steak-and-ale-pie-1.jpg"
    },
    {
        name: "3 Cheese Courgette Pasta Bake",
        cuisine: "Italian",
        tags: ["Leftovers", "Vegetarian"],
        img:"https://production-media.gousto.co.uk/cms/mood-image/2023---3-Cheese-Veg-Packed-Pasta-Bake-7065-1579799730289-x700.jpg"
    },
    {
        name: "Steak and Ale Pie",
        cuisine: "British",
        tags: ["Leftovers"],
        img: "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2018/06/Hairy-Bikers%E2%80%99-steak-and-ale-pie-1.jpg"
    },
    {
        name: "Gong Bao Chicken",
        cuisine: "Chinese",
        tags: ["Weeknight", "Easy"],
        img:"https://realfood.tesco.com/media/images/Gong-bao-chicken-1400x919-6376346b-85c1-4365-bfe8-54ac7bca9913-0-1400x919.jpg"
    },
    {
        name: "Gong Bao Chicken",
        cuisine: "Chinese",
        tags: ["Weeknight", "Easy"],
        img:"https://realfood.tesco.com/media/images/Gong-bao-chicken-1400x919-6376346b-85c1-4365-bfe8-54ac7bca9913-0-1400x919.jpg"
    },
]

const testCuisines = [
    {
        id: 1,
        cuisine: "Chinese"
    },
    {
        id: 2,
        cuisine: "British"
    },
    {
        id: 3,
        cuisine: "Italian"
    },
    {
        id: 4,
        cuisine: "Indian"
    },
    {
        id: 5,
        cuisine: "French" 
    }]
export default function PlanHome(): JSX.Element {
    return <>
    {/* Weekly specials move to another function */}
    <Grid overflowX="auto" gridAutoFlow="column">
        {testData.map((recipe) => {
            return <Box w="40vw" m="2vw">
                <Image src={recipe.img} boxSize="40vw" objectFit="cover" borderRadius="10"></Image>
                <Flex>
                    <Heading fontSize="sm">{recipe.name}</Heading>
                    <Flex m="1vw">
                        <IconButton aria-label="Add to favourites" backgroundColor="mediumorchid" icon={<RiHeart2Line/>} size="xs" mr="1vw" />
                        <IconButton aria-label="Add to mealplan" backgroundColor="teal" icon={<GiMeal color="#66CCB5" />} size="xs"  />
                    </Flex>
                </Flex>
                {recipe.tags.map((tag) => {
                   return <Tag size="sm" fontSize="xs" fontWeight="bold" m="1vw" backgroundColor="lightseagreen">{tag}</Tag>
                })}
            </Box> 
        })}
    </Grid>
    <Heading textAlign="left" ml="2vw">Recipes</Heading>
    <Flex mx="2vw">
        <Input placeholder="Search recipes..." size="xs" w="50vw"></Input>
        <Spacer />
        <Select placeholder="Select cuisine" size="xs" w="40vw"> 
            {testCuisines.map((cuisine) => {
                return <option value={cuisine.id}>{cuisine.cuisine}</option>})}
        </Select>
    </Flex>
    <Flex my="2vw" overflowX="scroll">
        {/* Look at use outside click */}
        <Tag mx="1vw" backgroundColor="crimson" color="white" fontWeight="bold" fontSize="xs">Easy</Tag> 
        <Tag mx="1vw" backgroundColor="gold" fontWeight="bold" fontSize="xs">Weeknight</Tag>
        <Tag mx="1vw" backgroundColor="mediumseagreen" color="white" fontWeight="bold" fontSize="xs">Vegetarian</Tag>
        <Tag mx="1vw" backgroundColor="steelblue" color="white" fontWeight="bold" fontSize="xs">Vegan</Tag>
        <Tag mx="1vw" backgroundColor="darkmagenta" color="white" fontWeight="bold" fontSize="xs">Leftovers</Tag>
    </Flex>
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {testData.map((recipe) => {
            return <Box >
                <Box w="40vw" m="auto">
                {/* div with background image set instead */}
                    <Image src={recipe.img} boxSize="40vw" objectFit="cover" borderRadius="10"></Image>
                    <Flex>
                        <Heading fontSize="sm">{recipe.name}</Heading>
                        <Flex m="1vw">
                            <IconButton aria-label="Add to favourites" backgroundColor="mediumorchid" icon={<RiHeart2Line/>} size="xs" mr="1vw" />
                            <IconButton aria-label="Add to mealplan" backgroundColor="teal" icon={<GiMeal color="#66CCB5"/>} size="xs"  />
                        </Flex> 
                    </Flex>
                </Box> 
            </Box>
        })}
    </Grid>
        
    </>
}  