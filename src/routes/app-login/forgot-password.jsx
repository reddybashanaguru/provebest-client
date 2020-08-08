import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import forgotPasswordzImg from "../../assets/images/filter/19.png";
import Button from "@material-ui/core/Button";

const UserForgotPassword = (props) => {
  const { setLoginMode } = props;
  return (
    <div className="root forgot-password">
      <Grid container spacing={3}>
        <Grid item md={7} className="bg-popup">
          <img src={forgotPasswordzImg} className="cover-img" alt="Logo" />
        </Grid>
        <Grid item md={5} className="bg-popup">
          <Typography component="div">
            <form className="modalform">
              <div className="bolder title4">Forgot Password?</div>
              <div className="h12 my-3">
                We already sent a code to your email and mobile
              </div>
              <div className="form-group">
                <label className="h12 bold600" for="email1">
                  EnterCode
                </label>
                <br />
                <TextField
                  type="number"
                  name="code"
                  id="code"
                  placeholder="Enter"
                />
              </div>
              <div className="d-flex align-items-center form-group justify-content-end">
                <span class="h12 link">Resend</span>
              </div>
              <div className="form-group">
                <Button
                  className="btn btn-primary btn-block btn-md"
                  onClick={() => {
                    setLoginMode("enterNewPassword");
                  }}
                >
                  Next
                </Button>
              </div>
              <div className="bold500 h12">
                Don’t have an account?{" "}
                <span
                  className="link"
                  onClick={() => {
                    setLoginMode("register");
                  }}
                >
                  Register
                </span>
                <span
                  className="link h12 float-right"
                  onClick={() => {
                    setLoginMode("login");
                  }}
                >
                  Sign In
                </span>
              </div>
            </form>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForgotPassword;
