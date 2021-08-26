import { Box, Divider, Skeleton, useMediaQuery } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";
import RecipeHome from "./components/Recipes/RecipeHome";
import SignInScreen from "./Firebase/SignIn";
import firebase from 'firebase/app';
import { firebaseConfig } from "./Firebase/config";  
import { createContext, useState } from "react";
import MenuBarMobile from "./components/MenuBarMobile";
import MenuBarDesktop from "./components/MenuBarDesktop";
import FavouritesHome from "./components/Favourites/FavouritesHome";

//Contexts
export const firebaseApp = firebase.initializeApp(firebaseConfig); 
export const IsLoadingContext = createContext(true)
export const UserContext = createContext<firebase.User | undefined>(undefined) 


function App() { 
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | undefined>(undefined)
  const [isDesktop] = useMediaQuery("(min-width: 1280px)")

    // useEffect(() => {
    //   const unsubscribe = firebase.auth().onAuthStateChanged(() => {setIsLoading(false)});
    //   return unsubscribe;
    // }, []);

  firebase.auth().onAuthStateChanged((user) => {
    setIsLoading(false)
    if (user) {
      setUser(user)
    }
    else {
      setUser(undefined)
    }
  })

    // if (!isLoading) {
    //   // return <Spinner left="50%" color="primary"/>
    // } 

  return (
    <UserContext.Provider value={user}>
    <IsLoadingContext.Provider value={isLoading}>
      <Box width="100%" maxWidth="1024px" margin="auto">
        <Router>
          <Skeleton isLoaded={!isLoading}>
          <Box>
            {isDesktop === true ? <MenuBarDesktop /> : <MenuBarMobile />}
            <Divider orientation="horizontal" /> 
          </Box>
          </Skeleton>
          <Switch>
          <Route path="/signin">
              <SignInScreen />
            </Route>
            <Route path="/add">
              <Box textAlign="center" m="auto">
                Add
              </Box>
            </Route>
            <Route path="/plan">
              <Box textAlign="center" m="auto">
                Plan
              </Box>
            </Route>
            <Route path="/favourites">
              <FavouritesHome /> 
            </Route>
            <Route path="/admin">
              <Box textAlign="center" m="auto">
                Admin
              </Box>
            </Route>
            <Route path="/">
              {/* {isLoading ? <Skeleton><RecipeHome /></Skeleton> : <RecipeHome />} */}
              <RecipeHome />
            </Route>
          </Switch>
        </Router>
      </Box>
      </IsLoadingContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
