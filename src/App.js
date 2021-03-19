import React, { useState, useEffect, createContext } from "react";
import { Switch, Route } from "react-router-dom";
import fakeData from "./fakeData/fakeData";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Destination from "./Components/Destination/Destination";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState([]);

  console.log(loggedInUser);

  useEffect(() => {
    setData(fakeData);
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Header />
        <div className="d-flex flex-column align-items-center">
          <Switch>
            <Route exact path="/">
              <Home data={data} />
            </Route>
            <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
