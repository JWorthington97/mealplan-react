import {
  Heading,
  Flex,
  Icon,
  Spacer,
  Link
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import { Link as RouterLink } from 'react-router-dom'
import SignOut from "../Firebase/SignOut";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";

export default function MenuBarDesktop(): JSX.Element {
  const user = useContext(UserContext)

  useEffect(() => {
  }, [user])

  return (
    <Flex>
      <Flex>
        <Heading color="primary" margin="auto">
          Recipeasy
        </Heading>
      </Flex>
      <Spacer />
      <Flex margin="auto" textAlign="center">
        <Link as={RouterLink} to="/" color="primary" fontWeight="bold" fontSize="xl" mr="2vw">Recipes</Link>
        <Link as={RouterLink} to="/favourites" color="primary" fontWeight="bold" fontSize="xl" mr="2vw">Favourites</Link>
        <Link as={RouterLink} to="/plan" color="primary" fontWeight="bold" fontSize="xl" mr="2vw">Plan</Link>
        <Link as={RouterLink} to="/add" color="primary" fontWeight="bold" fontSize="xl" mr="2vw">Add</Link>
      </Flex>
      <Spacer />
      {
        user ? 
          <SignOut /> : 
          <Link as={RouterLink} to="/signin" color="primary" fontWeight="bold" fontSize="xl" mx="1vw" my="auto">Sign In</Link>
      }    
        <Icon as={GiMeal} color="primary" h={55} w={55} cursor="pointer" />
    </Flex>
  );
}
