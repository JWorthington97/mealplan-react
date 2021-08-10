import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, Icon, IconButton, Spacer } from '@chakra-ui/react'
import { GiMeal, GiBanana } from "react-icons/gi"

export default function MenuBar(): JSX.Element {
    return <Flex mx="1vw">
        <IconButton 
        aria-label="Open hamburger menu"
        m="auto"
        icon={<Icon as={HamburgerIcon} h={8} w={8} color="primary"/>}
        />
        <Spacer />
        <Flex>
            <Icon as={GiMeal} color="primary" h={55} w={55} ml="1vw"/>
            <Heading color="primary" margin="auto">mealplan</Heading> 
        </Flex>
        <Spacer />
        <IconButton 
            aria-label="Go to profile" 
            backgroundColor="#fdca96"
            m="auto"
            borderRadius="50%"
            icon={<Icon as={GiBanana} h={6} w={6} m="2vw" color="#fdfd96"/>} 
            />
    </Flex> 
} 