import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Blank from "./components/Blank/Blank";

function App() {
  return (
    <Router>
      <Switch>
        <Router>
          <Route path="*">
            <Blank />
          </Route>
        </Router>
      </Switch>
    </Router>
  )
}

export default App;