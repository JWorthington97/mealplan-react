import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useRef } from "react";
import { Button } from '@chakra-ui/react'
// import { FirebaseAuthContext } from "../Firebase/context";
import firebase from "firebase";
import SignInScreen from "../Firebase/SignIn";
import SignOut from "../Firebase/SignOut";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  IconButton,
  useDisclosure,
  Link,
  Box,
  LinkProps,
  forwardRef,
} from "@chakra-ui/react";


export default function MenuDrawer(): JSX.Element {
  const user = firebase.auth().currentUser
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hamburgerRef = useRef(null);

  const HamburgerLink = forwardRef<LinkProps, "div">((props, ref) => (
    <Box m="3vw">
      <Link as={RouterLink} onClick={onClose} variant="hamburger" {...props} />
    </Box>
  ));

  return (
    <>
      <IconButton
        aria-label="Open hamburger menu"
        m="auto"
        icon={<Icon as={HamburgerIcon} h={8} w={8} color="primary" />}
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
          <DrawerCloseButton />
          <DrawerHeader color="primary" borderBottomWidth="1px">
            what's on the menu?
          </DrawerHeader>
          <DrawerBody>
            <HamburgerLink to="/">Recipes</HamburgerLink>
            <HamburgerLink to="/favourites">Favourites</HamburgerLink>
            <HamburgerLink to="/plan">Plan</HamburgerLink>
            <HamburgerLink to="/add">Add</HamburgerLink>
            {
              user ? 
                <SignOut onClose={onClose}/> : 
                <HamburgerLink to="/signin">Sign In</HamburgerLink> 
            }
            <Box mt="10vh" >{user?.displayName}</Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer> 
    </>
  );
}
