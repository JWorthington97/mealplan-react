import {
  Heading,
  Flex,
  Icon,
  Spacer,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";

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
      <Spacer />
        <Icon as={GiMeal} color="primary" h={55} w={55} cursor="pointer" />
    </Flex>
  );
}
