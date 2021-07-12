import {
  Switch,
  Route,
  NavLink as RouterNavLink,
  useLocation,
} from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Users from "pages/Users";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

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
  const location = useLocation();
  console.log({ location: location });

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
                component={RouterNavLink}
                variant="contained"
                color="secondary"
                to="/Home"
              >
                Home
              </Button>
              <Button
                component={RouterNavLink}
                variant="contained"
                color="secondary"
                to="/login"
              >
                Login
              </Button>
              <Button
                component={RouterNavLink}
                variant="contained"
                color="secondary"
                to="/register"
              >
                Register
              </Button>
              <Button
                component={RouterNavLink}
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
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
