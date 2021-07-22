import { useHistory, Switch, Route, NavLink } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Users from "pages/Users";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const DevBar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #1976d2;
  padding: 1rem;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Routes = () => {
  const [authState, setAuthState] = useState(
    localStorage.getItem("auth-token")
  );

  const history = useHistory();
  const handleClick = () => history.push("/login");

  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <DevBar>
          <div>
            <span style={{ color: "White", fontSize: "1.2rem" }}>Pages:</span>
            <br />
            <br />
            <NavContainer>
              <Button
                component={NavLink}
                variant="contained"
                color="secondary"
                to="/Home"
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                variant="contained"
                color="secondary"
                to="/register"
              >
                Register
              </Button>
              <Button
                component={NavLink}
                variant="contained"
                color="secondary"
                to="/users"
              >
                Users
              </Button>
            </NavContainer>
          </div>
          <div
            style={{ alignSelf: "center", fontSize: "1.2rem", color: "white" }}
          >
            Development mode
          </div>
        </DevBar>
      ) : (
        ""
      )}
      {authState ? (
        <Switch>
          <Route path="/">
            <Users auth={{ authState, setAuthState }} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/login">
            <Login auth={{ authState, setAuthState }} />
          </Route>
          <Route path="/register">
            <Register auth={{ authState, setAuthState }} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default Routes;
