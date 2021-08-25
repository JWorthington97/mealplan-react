import { Flex, Heading, Icon, Spacer } from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import MenuDrawer from "./MenuDrawer";

export default function MenuBar(): JSX.Element {
  return (
    <Flex mx={["2vw", "2vw", "1vw", "1vw", "0vw"]}>
      <MenuDrawer />
      <Spacer />
      <Flex>
        
        <Heading color="primary" margin="auto">
          Recipeasy
        </Heading>
        {/* <Icon as={GiMeal} color="primary" h={55} w={55} ml={0.5}/> */}
      </Flex>
      <Spacer />
      <Icon as={GiMeal} color="primary" h={55} w={55} ml={0.5}/>
      {/* <IconButton
        aria-label="Go to profile"
        backgroundColor="#fdca96"
        m="auto"
        borderRadius="50%"
        h={50}
        w={50}
        icon={<Icon as={GiBanana} h={6} w={6} m="2vw" color="#fdfd96" />}
      /> */}
    </Flex>
  );
}
