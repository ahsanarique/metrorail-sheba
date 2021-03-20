import React, { useState, createContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import { fakeData } from "./fakeData/fakeData";
import TicketCard from "./Components/TicketCard/TicketCard";
import Destination from "./Components/Destination/Destination";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fakeData);
  }, []);

  console.log(loggedInUser);

  return (
    <React.Fragment>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Header />
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <Switch>
            <Route exact path="/">
              <div className="container-fluid d-flex justify-content-center flex-wrap align-items-center mt-5">
                {data.map((ticket) => (
                  <div>
                    <TicketCard
                      key={ticket.id}
                      id={ticket.id}
                      banner={ticket.banner}
                      price={ticket.price}
                      type={ticket.type}
                    ></TicketCard>
                  </div>
                ))}
              </div>
            </Route>
            <PrivateRoute path="/destination=:id">
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
