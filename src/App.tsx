import './App.css';
import MenuBarv1 from './components/MenuBarv1';
import MenuBar from './components/MenuBar';
import { Box, Divider } from '@chakra-ui/react'

function App() {
  return (<Box>
    {/* <MenuBarv1 /> */}
    <MenuBar />
    <Divider orientation="horizontal" />
    </Box>
    
  );
}

export default App; 
