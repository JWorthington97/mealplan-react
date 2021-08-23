import "./App.css";
// import MenuBarv1 from './components/MenuBarv1';
import MenuBar from "./components/MenuBar";
import { Box, Divider, Heading, Spinner } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  // Link
} from "react-router-dom";
import RecipeHome from "./components/Recipes/RecipeHome";
import SignInScreen from "./Firebase/SignInScreen";

import firebase from 'firebase';
import "firebase/auth"
import { firebaseConfig } from "./Firebase/config"; 
import { useEffect, useState } from "react";

export const firebaseApp = firebase.initializeApp(firebaseConfig); 


function App() { 
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | null>(null);
  
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {setUser(user); setIsLoading(false)});
      return unsubscribe;
    }, []);

    if (isLoading) {
      return <Spinner left="50%" color="primary"/>
    } 
  
    console.log(user?.uid)

  return (
      <Box width="100%" maxWidth="900px" margin="auto">
        <Router>
          <Box>
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
              <Heading size="md" textAlign="center" mt="1vw">
                Weekly Recommendations
              </Heading>
              <RecipeHome />
            </Route>
          </Switch>
        </Router>
      </Box>
  );
}

export default App;
