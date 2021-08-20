import {
  Box,
  Heading,
  Flex,
  Icon,
  Spacer,
  Button,
  Text,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function MenuBarv1(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex mx="1vw">
      <Flex>
        <Icon as={GiMeal} color="primary" h={50} w={50} />
        <Heading color="primary" margin="auto">
          mealplan
        </Heading>
      </Flex>
      <Spacer />
      <Flex margin="auto" textAlign="center">
        <Heading variant="topBar" size="md">
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
        </Heading>
      </Flex>
      <Spacer />
      <Flex margin="auto">
        <Text margin="auto">Welcome, @testuser!</Text>
        <Button color="primary" variant="ghost">
          Sign Out
        </Button>
        <IconButton
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          aria-label="Color mode switcher"
          variant="outline"
          onClick={toggleColorMode}
        ></IconButton>
      </Flex>
    </Flex>
  );
}
