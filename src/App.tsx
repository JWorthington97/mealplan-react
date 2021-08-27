import { Box, Divider, Skeleton, useMediaQuery } from "@chakra-ui/react";
import {
  HashRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";
import RecipeHome from "./components/Recipes/RecipeHome";
import SignInScreen from "./Firebase/SignIn";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseConfig } from "./Firebase/config";  
import { createContext, useState, useEffect } from "react";
import MenuBarMobile from "./components/MenuBarMobile";
import MenuBarDesktop from "./components/MenuBarDesktop";
import FavouritesHome from "./components/Favourites/FavouritesHome";
import { ICuisine, IRecipe, IRecipeFormatted } from "./Types";

//Contexts
export const firebaseApp = initializeApp(firebaseConfig); 
export const auth = getAuth(firebaseApp)
export const IsLoadingContext = createContext(true)
export const UserContext = createContext<User | undefined>(undefined) 

type TRecipe = {
  recipes: IRecipeFormatted[], 
  setRecipes(recipes: IRecipeFormatted[]): void
}
export const RecipesContext = createContext<TRecipe>({recipes: [], setRecipes: () => console.log()})
export const CuisinesContext = createContext<ICuisine[]>([])

function App() { 
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isDesktop] = useMediaQuery("(min-width: 1280px)")
  const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]);
  const [cuisines, setCuisines] = useState<ICuisine[]>([])

  // Get Recipes. Potential to join specials flag onto this as well
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

  // Get Cuisines
  useEffect(() => {
    const getCuisines = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cuisines`
      );
      const body = await response.json();
      setCuisines(body);
    };
    getCuisines();
  }, []);

  

  onAuthStateChanged(auth, user => {
    setIsLoading(false)
    if (user) {
      setUser(user)
    }
    else {
      setUser(undefined)
    }
  })

  return (
    <UserContext.Provider value={user}>
    <IsLoadingContext.Provider value={isLoading}>
      <RecipesContext.Provider value={{recipes, setRecipes}}>
        <CuisinesContext.Provider value={cuisines}>
        <Box backgroundColor="#fefefb"> 

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
      </Box>
      </CuisinesContext.Provider>
      </RecipesContext.Provider>
      </IsLoadingContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
