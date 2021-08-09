import { Box, Heading, Flex, Icon, Spacer, Button, useColorMode, IconButton} from '@chakra-ui/react'
import styled from 'styled-components'
import { GiMeal } from 'react-icons/gi'
import { MoonIcon, SunIcon} from '@chakra-ui/icons'

export default function MenuBar(): JSX.Element {
    const { colorMode, toggleColorMode} = useColorMode()
    return <Flex border="2px"> 
        <Flex border="2px">
            <Icon as={GiMeal} color="#38B2AC" h={50} w={50}/>
            <Heading color="#38B2AC" margin="auto">mealplan</Heading>
        </Flex> 
        <Spacer />
        <Flex margin="auto" border="1px" textAlign="center">
            <MenuHeading  mr="2vw">Recipes</MenuHeading>
            <MenuHeading size="md" mr="2vw">Favourites</MenuHeading>
            <MenuHeading size="md" mr="2vw">Plan</MenuHeading>
            <MenuHeading  size="md">Add</MenuHeading>
        </Flex>
        <Spacer />
        <Box margin="auto">
            Welcome @user
            <Button color="#38B2AC" variant="ghost">Sign Out</Button> 
            <IconButton 
            icon={colorMode === "light" ? < SunIcon /> : <MoonIcon />}
            aria-label="Color mode switcher"
            variant="outline"
            onClick={toggleColorMode}>
            </IconButton>
            
        </Box>
    </Flex>
    
}

const MenuHeading = styled(Heading)`
    color: #38B2AC;
    size: "md"
`