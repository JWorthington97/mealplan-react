import {
  Heading,
  Flex,
  Icon,
  Spacer,
  Link
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import { Link as RouterLink } from 'react-router-dom'

export default function MenuBarv1(): JSX.Element {
  return (
    <Flex>
      <Flex>
        <Heading color="primary" margin="auto">
          Recipeasy
        </Heading>
      </Flex>
      <Spacer />
      <Flex margin="auto" textAlign="center">
        <Link as={RouterLink} to="/" color="primary" fontWeight="bold" fontSize="xl" mx="1vw">Recipes</Link>
        <Link as={RouterLink} to="/favourites" color="primary" fontWeight="bold" fontSize="xl" mx="1vw">Favourites</Link>
        <Link as={RouterLink} to="/plan" color="primary" fontWeight="bold" fontSize="xl" mx="1vw">Plan</Link>
        <Link as={RouterLink} to="/add" color="primary" fontWeight="bold" fontSize="xl" mx="1vw">Recipes</Link>
        {/* <Heading variant="topBar" size="md">
          Recipes
        </Heading>
        <Heading variant="topBar" size="md">
          Favourites
        </Heading> 
        <Heading variant="topBar" size="md">
          Plan
        </Heading>
        <Heading variant="topBar" size="md">
          Add
        </Heading> */}
      </Flex>
      <Spacer />
      <Spacer />
        <Icon as={GiMeal} color="primary" h={55} w={55} cursor="pointer" />
    </Flex>
  );
}
