import { HamburgerIcon } from "@chakra-ui/icons"
import { Link as RouterLink} from 'react-router-dom'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    color,
    Icon,
    IconButton,
    useDisclosure,
    Heading,
    Link,
    Box
  } from "@chakra-ui/react"
import { useRef } from "react"

export default function MenuDrawer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const hamburgerRef = useRef(null)

    return (
    <>
      <IconButton 
        aria-label="Open hamburger menu"
        m="auto"
        icon={<Icon as={HamburgerIcon} h={8} w={8} color="primary"/>}
        ref={hamburgerRef}
        onClick={onOpen}
        />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={hamburgerRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader color="primary" borderBottomWidth="1px">what's on the menu?</DrawerHeader>
          <DrawerBody>
            {/* <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold" ml="6vw">Recipes</Link> */}
            <Box m="3vw">
              <Link to="/" fontSize="xl" fontWeight="bold">Recipes</Link>
            </Box>
            <Box m="3vw">
            <Link to="/favourites" fontSize="xl" fontWeight="bold">Favourites</Link>
            </Box>
            <Box m="3vw">
            <Link to="/plan" fontSize="xl" fontWeight="bold">Plan</Link>
            </Box>
            <Box m="3vw">
            <Link to="/add" fontSize="xl" fontWeight="bold">Add</Link>
            </Box>
            <Box mt="10vh">
              User info here
            </Box>
          </DrawerBody>
        </DrawerContent>

      </Drawer>
    </>
    )
} 