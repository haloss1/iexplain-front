import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "assets/Haloss1Profile.png";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Home = () => {
  const classes = useStyles();
  return (
    <Content>
      <AppBar position="sticky">
        <Toolbar>
          <img
            src={logo}
            style={{ width: "3rem", padding: "0.7rem" }}
            alt="Logo"
          />
          <Typography variant="h6" className={classes.title}>
            IExplain
          </Typography>
          <Button component={Link} color="inherit" to="/login">
            Log in
          </Button>
          <Button component={Link} color="inherit" to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          color: "white",
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "5vw",
          flexDirection: "column",
        }}
      >
        IExplain
        <div style={{ fontSize: "2vw", marginBottom: "1rem" }}>
          I want to learn:{" "}
          <span style={{ fontSize: "2vw", color: "yellow" }}>Node JS</span>
        </div>
        <Button
          component={Link}
          variant="contained"
          color="secondary"
          to="/register"
        >
          Get started
        </Button>
      </div>
    </Content>
  );
};

export default Home;
