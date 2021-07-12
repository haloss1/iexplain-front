import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "assets/Haloss1Profile.png";

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

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            style={{ width: "3rem", padding: "0.7rem" }}
            alt="Logo"
          />
          <Typography variant="h6" className={classes.title}>
            Haloss1 630 Exam
          </Typography>
          <Button component={Link} color="inherit" to="/login">
            Login
          </Button>
          <Button component={Link} color="inherit" to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Home;
