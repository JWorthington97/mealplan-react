import "./App.css";
// import MenuBarv1 from './components/MenuBarv1';
import MenuBar from "./components/MenuBar";
import { Box, Divider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  // Link
} from "react-router-dom";
import RecipeHome from "./components/Recipes/RecipeHome";
import SignInScreen from "./Firebase/SignIn";

import firebase from 'firebase';
import "firebase/auth"
import { firebaseConfig } from "./Firebase/config"; 
import { createContext, useEffect, useState } from "react";

export const firebaseApp = firebase.initializeApp(firebaseConfig);  

export const IsLoadingContext = createContext(true)


function App() { 
  const [isLoading, setIsLoading] = useState(true)
  // const [user, setUser] = useState<firebase.User | null>(null);
  
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(() => {setIsLoading(false)});
      return unsubscribe;
    }, []);

    // if (!isLoading) {
    //   // return <Spinner left="50%" color="primary"/>
    // } 
  
   

  return (
    <IsLoadingContext.Provider value={isLoading}>
      <Box width="100%" maxWidth="1024px" margin="auto">
        <Router>
          <Box>
            {/* {isLoading ? <Skeleton><MenuBar /></Skeleton> : <MenuBar />} */}
            <MenuBar />
            <Divider orientation="horizontal" /> 
          </Box>
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
              <Box textAlign="center" m="auto">
                Favourites
              </Box>
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
  );
}

export default App;
