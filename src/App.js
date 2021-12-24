import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddUser from "./components/AddUser/AddUser";
import Header from './components/Header/Header';
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Users from "./components/Users/Users";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Users />
            </Route>
            <Route exact path="/users">
              <Users></Users>
            </Route>
            <Route path="/users/add">
              <AddUser></AddUser>
            </Route>
            <Route path="/users/update/:id">
              <UpdateUser></UpdateUser>
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;