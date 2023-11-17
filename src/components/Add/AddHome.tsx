import { Box, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IRecipeTags } from '../../Types';
import { RecipeTag } from '../Misc/RecipeTag';
export default function AddHome(): JSX.Element {
    const [recipeImage, setRecipeImage] = useState("")
    const [tagsChosen, setTagsChosen] = useState<IRecipeTags>({
        easy: false,
        weeknight: false,
        vegetarian: false,
        vegan: false,
        leftovers: false,
      });
      
    return <Box>
        <Box 
    w={["45vw", "45vw", "30vw", "20vw", "10vw"]} 
    m="auto"
    >
    <Image 
    src={recipeImage} 
    boxSize={["45vw", "45vw", "30vw", "20vw", "10vw"]} 
    borderTopRadius="10"
    // fallbackSrc={process.env.PUBLIC_URL + 'meal.png'}
     />
    <Text textAlign="left">Sample recipe name</Text>
    <Flex flexWrap="wrap">
    {Object.keys(tagsChosen).sort().map((tag) => {
            return (
              <RecipeTag
                key={tag}
                tagVariant={tag}
                isSelected={tagsChosen[tag]}
                cursor="pointer"
                mr={0.5}
                mb={0.5}
                onClick={() =>
                  setTagsChosen({
                    ...tagsChosen,
                    [tag]: tagsChosen[tag] ? false : true,
                  })
                }
              />
            );
          })}
        </Flex>
    </Box>
    <Box>
    <Text
          ml={["2vw", "2vw", "2vw", "1vw", 0]}
          mt={["2", "2", "2", "2", "32px"]}
          mb="1"
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
          textAlign="left"
        >
          Add New Recipe
        </Text>
        <Input placeholder="Provide image URL" onChange={(e) => setRecipeImage(e.target.value)} />
    </Box>
    </Box>
} 

