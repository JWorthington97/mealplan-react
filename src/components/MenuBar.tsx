import { Flex, Heading, Icon, IconButton, Spacer } from "@chakra-ui/react";
import { GiMeal, GiBanana } from "react-icons/gi";
import MenuDrawer from "./MenuDrawer";

export default function MenuBar(): JSX.Element {
  return (
    <Flex mx={["2vw", "2vw", "1vw", "1vw", "0vw"]}>
      <MenuDrawer />
      <Spacer />
      <Flex>
        <Icon as={GiMeal} color="primary" h={55} w={55} ml="1vw" />
        <Heading color="primary" margin="auto">
          recipeasy
        </Heading>
      </Flex>
      <Spacer />
      <IconButton
        aria-label="Go to profile"
        backgroundColor="#fdca96"
        m="auto"
        borderRadius="50%"
        h={50}
        w={50}
        icon={<Icon as={GiBanana} h={6} w={6} m="2vw" color="#fdfd96" />}
      />
    </Flex>
  );
}
