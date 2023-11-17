import { Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { GiMeal } from "react-icons/gi";
import MenuDrawer from "./MenuDrawer";
import { useHistory } from "react-router";

export default function MenuBarMobile(): JSX.Element {
  const history = useHistory();
  return (
    <Flex mx={["2vw", "2vw", "1vw", "1vw", "0vw"]}>
      <MenuDrawer />
      <Spacer />
      <Flex>
        <Heading color="primary" margin="auto">
          Personal Project
        </Heading>
      </Flex>
      <Spacer />
      <IconButton
        aria-label="Personal project logo"
        // icon={<GiMeal color="#66CCB5" size="100%"/>}  
        color="primary"
        h={55}
        w={55}
        variant="unstyled"
        onClick={() => history.push("/")}
      />
    </Flex> 
  );
}
