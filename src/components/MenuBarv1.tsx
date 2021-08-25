import {
  Heading,
  Flex,
  Icon,
  Spacer,
  Link
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import { Link as RouterLink } from 'react-router-dom'
import firebase from "firebase";
import SignOut from "../Firebase/SignOut";
import { useState } from "react";

export default function MenuBarv1(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false)

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     setLoggedIn(true) 
    }
    else {
      setLoggedIn(false)
    }})

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
        <Link as={RouterLink} to="/add" color="primary" fontWeight="bold" fontSize="xl" mx="1vw">Add</Link>
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
      {
              loggedIn ? 
                <SignOut /> : 
                <Link as={RouterLink} to="/signin" color="primary" fontWeight="bold" fontSize="xl" mx="1vw" my="auto">Sign In</Link>
            }
            
        <Icon as={GiMeal} color="primary" h={55} w={55} cursor="pointer" />
    </Flex>
  );
}
