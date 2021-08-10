import './App.css';
// import MenuBarv1 from './components/MenuBarv1';
import MenuBar from './components/MenuBar';
import { Box, Divider } from '@chakra-ui/react'
import { BrowserRouter as Router,
  Switch,
  Route,
  // Link 
} from 'react-router-dom'

function App() {
  return (
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
        <Route path="/">
          <Box textAlign="center">Recipes</Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App; 
