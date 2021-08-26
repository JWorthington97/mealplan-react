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
import { createContext, useState, useEffect } from "react";
import MenuBarMobile from "./components/MenuBarMobile";
import MenuBarDesktop from "./components/MenuBarDesktop";
import FavouritesHome from "./components/Favourites/FavouritesHome";
import { IRecipe, IRecipeFormatted } from "./Types";

//Contexts
export const firebaseApp = firebase.initializeApp(firebaseConfig); 
export const IsLoadingContext = createContext(true)
export const UserContext = createContext<firebase.User | undefined>(undefined) 

type TRecipe = {
  recipes: IRecipeFormatted[], 
  setRecipes(recipes: IRecipeFormatted[]): void
}
export const RecipesContext = createContext<TRecipe>({recipes: [], setRecipes: () => console.log()})


function App() { 
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<firebase.User | undefined>(undefined)
  const [isDesktop] = useMediaQuery("(min-width: 1280px)")
  const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${user?.uid}` 
      );
      const body = await response.json();
      const formatted: IRecipeFormatted[] = body.map((recipe: IRecipe) => {
        return { ...recipe, tags: recipe.tags.split(", ") };
      });
      setRecipes(formatted);
    };
    getRecipes();
  }, [isLoading, user]); // is loading here mgiht need to be not here

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
      <RecipesContext.Provider value={{recipes, setRecipes}}>
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
      </RecipesContext.Provider>
      </IsLoadingContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
