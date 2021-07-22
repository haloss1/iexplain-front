import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FormLabel } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ auth }: any) => {
  const [submitError, setSubmitError] = useState("");
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                axios({
                  method: "post",
                  url: "https://iebe-dev.herokuapp.com/auth",
                  data: {
                    email: values.email,
                    password: values.password,
                  },
                })
                  .then((r) => {
                    localStorage.setItem("auth-token", r.data.accessToken);
                    auth.setAuthState(true);
                  })
                  .catch((e) => {
                    setSubmitError(
                      e.response.data.error ? e.response.data.error : e.message
                    );
                    setTimeout(() => {
                      setSubmitError("");
                    }, 10000);
                  });
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className={classes.form} noValidate>
              {submitError ? (
                <FormLabel error>Error: {submitError}</FormLabel>
              ) : (
                ""
              )}
              <br />
              <br />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                component={TextField}
                type="email"
              />
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                component={TextField}
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/register">
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
              <br />
              <div style={{ textAlign: "center" }}>Made with ❤️ by Haloss1</div>
            </Form>
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
