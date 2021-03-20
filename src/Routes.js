import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./Pages/List/List";
import Nav from "./Components/Nav/Nav";
import Detail from "./Pages/Detail/Detail";

function Routes(props) {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default Routes;
