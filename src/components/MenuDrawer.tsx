import { HamburgerIcon } from "@chakra-ui/icons"
import { Link as RouterLink} from 'react-router-dom'

import {
    Drawer,
    DrawerBody,
    // DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    // color,
    Icon,
    IconButton,
    useDisclosure,
    Link,
    Box,
    LinkProps,
    forwardRef
  } from "@chakra-ui/react"
import { useRef } from "react"

export default function MenuDrawer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const hamburgerRef = useRef(null)

    const HamburgerLink = forwardRef<LinkProps, "div">((props, ref) => (
      <Box m="3vw">
        <Link as={RouterLink} onClick={onClose} variant="hamburger" {...props}/>
      </Box>
    ))

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
          <DrawerBody variant="hamburger">
            <HamburgerLink to="/">Recipes</HamburgerLink>
            <HamburgerLink to="/favourites">Favourites</HamburgerLink>
            <HamburgerLink to="/plan">Plan</HamburgerLink>
            <HamburgerLink to="/add">Add</HamburgerLink>
        
            <Box mt="10vh">
              User info here
            </Box>
          </DrawerBody>
        </DrawerContent>

      </Drawer>
    </>
    )
} 