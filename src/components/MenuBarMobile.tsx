import { Flex, Heading, Icon, Spacer } from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import MenuDrawer from "./MenuDrawer";

export default function MenuBarMobile(): JSX.Element {
  return (
    <Flex mx={["2vw", "2vw", "1vw", "1vw", "0vw"]}>
      <MenuDrawer />
      <Spacer />
      <Flex>
        <Heading color="primary" margin="auto">
          Recipeasy
        </Heading>
      </Flex>
      <Spacer />
      <Icon as={GiMeal} color="primary" h={55} w={55} ml={0.5}/>
    </Flex>
  );
}
