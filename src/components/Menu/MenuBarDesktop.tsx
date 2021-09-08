import {
  Heading,
  Flex,
  Spacer,
  Link,
  forwardRef,
  LinkProps,
  IconButton,
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import { Link as RouterLink, useHistory } from "react-router-dom";
import SignOut from "../../Firebase/SignOut";
import { useEffect, useContext } from "react";
import { UserContext } from "../../App";

export default function MenuBarDesktop(): JSX.Element {
  const user = useContext(UserContext);
  let history = useHistory();

  // Causes a refresh onAuthStateChanged
  useEffect(() => {}, [user]);

  const NavBarLink = forwardRef<LinkProps, "div">((props, ref) => (
    <Link
      as={RouterLink}
      color="primary"
      fontWeight="bold"
      fontSize="xl"
      mr="2vw"
      _focus={{ boxShadow: "none" }}
      {...props}
    />
  ));

  return (
    <Flex>
      <Flex>
        <Heading color="primary" margin="auto">
          Recipeasy
        </Heading>
      </Flex>
      <Spacer />
      <Flex margin="auto" textAlign="center">
        <NavBarLink to="/">Recipes</NavBarLink>
        <NavBarLink to="/favourites">Favourites</NavBarLink>
        <NavBarLink to="/plan">Plan</NavBarLink>
        <NavBarLink to="/add">Add</NavBarLink>
      </Flex>
      <Spacer />
      {user ? (
        <SignOut />
      ) : (
        <Link
          as={RouterLink}
          to="/signin"
          color="primary"
          fontWeight="bold"
          fontSize="xl"
          mx="1vw"
          my="auto"
        >
          Sign In
        </Link>
      )}
      <IconButton
        aria-label="Recipeasy logo"
        icon={<GiMeal color="#66CCB5" size="100%"/>} 
        color="primary"
        h={55}
        w={55}
        cursor="pointer"
        variant="unstyled"
        _focus={{ boxShadow: "none" }}
        onClick={() => history.push("/")}
      />
    </Flex>
  );
}
