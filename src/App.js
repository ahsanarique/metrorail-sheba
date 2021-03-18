import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/"></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
