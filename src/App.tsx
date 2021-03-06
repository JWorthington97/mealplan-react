import { Box, Divider, Skeleton, useMediaQuery } from "@chakra-ui/react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import RecipeHome from "./components/Recipes/RecipeHome";
import SignInScreen from "./Firebase/SignIn";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseConfig } from "./Firebase/config";
import { createContext, useState, useEffect } from "react";
import MenuBarMobile from "./components/Menu/MenuBarMobile";
import MenuBarDesktop from "./components/Menu/MenuBarDesktop";
import FavouritesHome from "./components/Favourites/FavouritesHome";
import { ICuisine, IRecipe, IRecipeFormatted } from "./Types"; 
import PlanHome from "./components/Plan/PlanHome";
import AddHome from "./components/Add/AddHome";

//Contexts
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const IsLoadingContext = createContext(true);
export const UserContext = createContext<User | undefined | null>(undefined);

type TRecipe = {
  recipes: IRecipeFormatted[];
  setRecipes(recipes: IRecipeFormatted[]): void;
};
type TSpecial = {
  specials: IRecipe[];
  setSpecials(specials: IRecipe[]): void;
};
// type TPlanRecipe = {
//   planRecipes: IRecipeFormatted[];
//   setPlanRecipes(planRecipes: IRecipeFormatted[]): void;
// };
export const RecipesContext = createContext<TRecipe>({
  recipes: [],
  setRecipes: () => console.log(),
});
export const SpecialsContext = createContext<TSpecial>({ 
  specials: [],
  setSpecials: () => console.log()
})

// export const PlanRecipesContext = createContext<TPlanRecipe>({
//   planRecipes: [],
//   setPlanRecipes: () => console.log(), 
// });

export const CuisinesContext = createContext<ICuisine[]>([]);

function App() {
  const [isLoading, setIsLoading] = useState(true); // 1
  const [isDesktop] = useMediaQuery("(min-width: 1280px)"); // 2 // 3
  const [user, setUser] = useState<User | undefined | null>(null); //4  
  const [recipes, setRecipes] = useState<IRecipeFormatted[]>([]); //5
  const [cuisines, setCuisines] = useState<ICuisine[]>([]);  //6
  // const [planRecipes, setPlanRecipes] = useState<IRecipeFormatted[]>([])

  useEffect(() => { //7
    onAuthStateChanged(auth, (OnAuthUser) => {
      if (OnAuthUser) {
        setUser(OnAuthUser);
      }  
      else {
        setUser(undefined);  
      }
    });
  }, [])

  // Get Recipes. Potential to join specials flag onto this as well
  useEffect(() => { //8
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
    if (user !== null) {
      getRecipes();
    }
    
  }, [user]); 

  // Get Cuisines
  useEffect(() => { //9
    const getCuisines = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cuisines`
      );
      const body = await response.json()
      setCuisines(body);
      
    };
    getCuisines();
  }, []);

  useEffect(() => { //10
    if (recipes && isLoading) {
      setIsLoading(false);
    }
  }, [recipes, isLoading])
 
  return (
    <UserContext.Provider value={user}>
      <IsLoadingContext.Provider value={isLoading}>
        <RecipesContext.Provider value={{ recipes, setRecipes }}>
          {/* <PlanRecipesContext.Provider value={{planRecipes, setPlanRecipes}}> */}
              <CuisinesContext.Provider value={cuisines}>
                <Box backgroundColor="#fefefb">
                  <Box width="100%" maxWidth="1024px" minHeight="100vh" margin="auto">
                    <Router>
                      <Skeleton isLoaded={!isLoading}>
                        <Box>
                          {isDesktop === true ? (
                            <MenuBarDesktop />
                          ) : (
                            <MenuBarMobile />
                          )}
                          <Divider orientation="horizontal" />
                        </Box>
                      </Skeleton>
                      <Switch>
                        <Route path="/signin">
                          <SignInScreen />
                        </Route>
                        <Route path="/add">
                          <Box textAlign="center" m="auto">
                            <AddHome />
                          </Box>
                        </Route>
                        <Route path="/plan">
                          <PlanHome />
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
                          <RecipeHome />
                        </Route>
                      </Switch>
                    </Router>
                  </Box>
                </Box> 
              </CuisinesContext.Provider>
            {/* </PlanRecipesContext.Provider> */}
        </RecipesContext.Provider>
      </IsLoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
