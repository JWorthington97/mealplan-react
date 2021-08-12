import './App.css';
// import MenuBarv1 from './components/MenuBarv1';
import MenuBar from './components/MenuBar';
import { Box, Divider, Heading } from '@chakra-ui/react'
import { BrowserRouter as Router,
  Switch,
  Route,
  // Link 
} from 'react-router-dom'
import RecipeHome from './components/Recipes/RecipeHome';

function App() { 
  return (
    <Box width="100%" maxWidth="900px" margin="auto">
    <Router>
      <Box>
    {/* <MenuBarv1 /> */}
      <MenuBar />
      <Divider orientation="horizontal" />
      </Box>
      <Switch>
        <Route path="/add">
          <Box textAlign="center" m="auto">Add</Box> 
          {/* insert function to load each page here */}
        </Route>
        <Route path="/plan">
          <Box textAlign="center" m="auto">Plan</Box>
        </Route>
        <Route path="/favourites">
          <Box textAlign="center" m="auto">Favourites</Box>
        </Route>
        <Route path="/admin">
          <Box textAlign="center" m="auto">Admin</Box>
        </Route>
        <Route path="/">
          <Heading size="md" textAlign="center" mt="1vw">Weekly Recommendations</Heading>
          <RecipeHome />
        </Route>
      </Switch>
    </Router>
    </Box>
  ); 
}

export default App;  
