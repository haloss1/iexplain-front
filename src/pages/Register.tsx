import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FormLabel } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ auth }: any) => {
  const [submitError, setSubmitError] = useState("");
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(6, "Must be 6 characters or more")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              axios({
                method: "post",
                url: "https://reqres.in/api/register",
                data: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                },
              })
                .then((r) => {
                  localStorage.setItem("auth-token", r.data.token);
                  localStorage.setItem("user-id", r.data.id);
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  component={TextField}
                  type="firstName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  component={TextField}
                  type="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  component={TextField}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  component={TextField}
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
            <br />
            <div style={{ textAlign: "center" }}>Made with ❤️ by Haloss1</div>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
