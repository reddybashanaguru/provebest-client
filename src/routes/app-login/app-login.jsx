import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import loginimg from "../../assets/images/filter/17.png";
import accountVerificartion from "../../assets/images/filter/18.png";
import forgotPasswordzImg from "../../assets/images/filter/19.png";
import Button from "@material-ui/core/Button";
import UserRegistration from "./register";
import UserLogin from "./login";
import UserAccountVerify from "./account-verify";
import UserForgotPassword from "./forgot-password";
import UserNewPassword from "./new-password";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalType: "register",
      userName: "",
      email: "",
      mobileNo: "",
      password: "",
      confirmPassword: "",
      isSave: false,
      errorMsg: {
        email: "",
        userName: "",
        password: "",
        mobileNo: "",
        confirmPassword: "",
        otp: "",
      },
      otp: "",
    };
  }

  componentDidMount() {
    axios.get(`https://provebest-api.herokuapp.com/profile/all`).then((res) => {
      console.log(res.data, "publicapi");
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginMode != this.props.loginMode && !this.state.open) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetPassword = () => {
    this.setState({ modalType: "enterNewPassword" });
  };

  registerUser = () => {
    const { userName, email, mobileNo, password, errorMsg } = this.state;
    const data = {
      name: userName,
      email: email,
      mobileNumber: mobileNo,
      password: password,
      confirmPassword: password,
    };
    debugger;
    const numericCheck = new RegExp("^(?=.*[0-9])");
    const SpecialCharactersCheck = new RegExp("^(?=.*[!@#$%^&*])");
    this.setState({ isSave: true });

    let emailError = errorMsg.email;
    let userNameError = errorMsg.userName;
    let passwordError = errorMsg.password;
    let mobileNoError = errorMsg.mobileNo;

    if (userName === "") {
      userNameError = "Enter the User Name";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      emailError = "Please enter the valid mail id";
    }
    if (mobileNo.length < 10) {
      mobileNoError = "Mobile No length should be 10";
    }
    if (password === "") {
      passwordError = "Enter the password";
    }
    if (password !== "") {
      if (!numericCheck.test(password)) {
        passwordError = "Atleast one Numeric character should be present";
      }
      if (!SpecialCharactersCheck.test(password)) {
        passwordError = "Atleast one special character should be present";
      }
      if (password.length < 6) {
        passwordError = "Password length should be greater than 6";
      }
    }
    this.setState({
      errorMsg: {
        ...errorMsg,
        userName: userNameError,
        password: passwordError,
        mobileNo: mobileNoError,
        email: emailError,
      },
    });
    if (
      (userName === "" ||
        email === "" ||
        mobileNo === "" ||
        password === "" ||
        userNameError !== "" ||
        passwordError !== "" ||
        mobileNoError != "",
      emailError != "")
    ) {
      return null;
    } else {
      axios({
        method: "post",
        url: "https://provebest-api.herokuapp.com/register/validate",
        headers: { "Content-Type": "application/json" },
        data,
      })
        .then((res) => {
          this.props.setLoginMode("accountVerify");
          this.setState({
            isSave: false,
            errorMsg: {
              email: "",
              userName: "",
              password: "",
              mobileNo: "",
              confirmPassword: "",
              otp: "",
            },
          });
        })
        .catch((error) => {
          alert(error.response.data.errors[0].msg);
          console.log(error.response.data, "errorsdata");
        });
    }
  };

  onValidateUserName = (e) => {
    const { errorMsg } = this.state;
    const numericCheck = new RegExp("(?=.*[0-9])");
    const SpecialCharactersCheck = new RegExp("(?=.*[!@#$%^&*])");
    let userNameError = errorMsg.userName;
    if (
      !SpecialCharactersCheck.test(e.target.value) ||
      !numericCheck.test(e.target.value)
    ) {
      userNameError = "";
    }
    if (numericCheck.test(e.target.value)) {
      userNameError = "User Name should not contain numeric";
    }
    if (SpecialCharactersCheck.test(e.target.value)) {
      userNameError = "User Name should not Special characters";
    }
    this.setState({
      errorMsg: {
        ...errorMsg,
        userName: userNameError,
      },
    });
  };

  onValidatePassword = (e, error, errorState) => {
    const { errorMsg } = this.state;
    const numericCheck = new RegExp("(?=.*[0-9])");
    const SpecialCharactersCheck = new RegExp("(?=.*[!@#$%^&*])");
    let passwordError = error;
    console.log(passwordError, "passwordError");
    const value = e.target.value;
    if (
      numericCheck.test(e.target.value) &&
      SpecialCharactersCheck.test(e.target.value) &&
      value.length > 6
    ) {
      passwordError = "";
    }
    console.log(
      numericCheck.test(e.target.value),
      "1",
      SpecialCharactersCheck.test(e.target.value),
      "2",
      value.length > 6
    );
    if (errorState === "password") {
      this.setState({
        errorMsg: {
          ...errorMsg,
          password: passwordError,
        },
      });
    }
    if (errorState === "confirmPassword") {
      this.setState({
        errorMsg: {
          ...errorMsg,
          confirmPassword: passwordError,
        },
      });
    }
  };

  verifyUser = () => {
    const { userName, email, mobileNo, password, otp } = this.state;
    this.setState({ isSave: true });
    const data = {
      name: userName,
      email: email,
      mobileNumber: mobileNo,
      password: password,
      confirmPassword: password,
    };
    if (otp === "") {
      return null;
    }
    axios({
      method: "post",
      url: "https://provebest-api.herokuapp.com/register",
      headers: { "Content-Type": "application/json" },
      data: data,
    })
      .then((response) => {
        const { status, data = {} } = response;
        const { message = "" } = data;
        //TODO:Toast message comes here !
        alert(message);
        if (status == 200) {
          this.props.history.push("/homepage/");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error ? error.code : "something went wrong !");
      });
    this.setState({
      modalType: null,
      open: false,
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  userLogin = () => {
    const { email, password, errorMsg } = this.state;
    const data = {
      email: email,
      password: password,
    };
    this.setState({ isSave: true });
    let userNameError = "";
    let passwordError = "";
    if (email === "") {
      userNameError = "Enter the User Name";
    }
    if (password === "") {
      passwordError = "Enter the password";
    }
    this.setState(
      {
        errorMsg: {
          ...errorMsg,
          userName: userNameError,
          password: passwordError,
        },
      },
      () => {
        console.log(
          userNameError,
          "userNameError",
          passwordError,
          "passwordError"
        );
        if (
          email === "" ||
          password === "" ||
          userNameError !== "" ||
          passwordError !== ""
        ) {
          return null;
        } else {
          axios({
            method: "post",
            url: "https://provebest-api.herokuapp.com/login/",
            headers: { "Content-Type": "application/json" },
            data: data,
          })
            .then((res) => {
              if (res.data === false) {
                alert("Please check the credentials");
                return;
              }
              alert("Logged In successfully");
              this.props.history.push("/homepage/");
              this.setState({ modalType: null, open: false });
            })
            .catch((error) => {
              alert(error.response.data.errors[0].msg);
              console.log(error.response.data, "errorsdata");
            });
        }
      }
    );
  };

  confirmPasswordCheck = () => {
    const { email, password, confirmPassword, errorMsg } = this.state;
    const data = {
      email: email,
      password: password,
      confirmPassword: password,
    };
    this.setState(
      {
        errorMsg: {
          ...errorMsg,
          password: this.passwordCheck(password, errorMsg.password),
        },
      },
      () => {
        console.log(password !== confirmPassword, "cond");
        console.log(
          password === "",
          confirmPassword === "",
          (errorMsg && errorMsg.password) !== "",
          "check"
        );
        console.log(errorMsg, "errorMsghhhhhhhhhh");
        // if (password === '' || (errorMsg && errorMsg.password) !== "") {
        if (password === "") {
          return null;
        } else if (password !== confirmPassword) {
          alert("passwords are not matching");
          return null;
        } else {
          axios({
            method: "post",
            url: "https://provebest-api.herokuapp.com/login/resetPassword",
            headers: { "Content-Type": "application/json" },
            data: data,
          }).then((res) => {
            console.log(res);
            alert("Password Changed Successfully");
            this.setState({
              modalType: null,
              open: false,
              password: "",
              confirmPassword: "",
            });
          });
        }
      }
    );
  };
  passwordCheck = (pass, error) => {
    const numericCheck = new RegExp("(?=.*[0-9])");
    const SpecialCharactersCheck = new RegExp("(?=.*[!@#$%^&*])");
    let errors = error;
    if (pass === "") {
      errors = "Enter the password";
    }
    if (pass !== "") {
      if (!numericCheck.test(pass)) {
        errors = "Atleast one Numeric character should be present";
      }
      if (!SpecialCharactersCheck.test(pass)) {
        errors = "Atleast one special character should be present";
      }
      if (pass.length < 6) {
        errors = "Password length should be greater than 6";
      }
    }
    return errors;
  };

  onEnterUserName = (e) => {
    const trimmeduserName = e.target.value.replace(/  +/g, " ");
    this.setState({ userName: trimmeduserName });
  };

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  setMobileNo = (e) => {
    this.setState({ mobileNo: e.target.value });
  };

  setSignIn = (e) => {
    this.setState({
      modalType: "login",
      userName: "",
      email: "",
      mobileNo: "",
      password: "",
    });
  };

  setForgotPassword = (e) => {
    if (this.state.email) {
      this.props.setLoginMode("forgotPassword");
      // this.setState({ modalType: "forgotPassword" });
    } else {
      alert("To reset password, Enter your email/mobile number!");
    }
  };
  setRegiterModal = (e) => {
    this.setState({ modalType: "register", userName: "", password: "" });
  };

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  setOtp = (e) => {
    this.setState({ otp: e.target.value });
  };
  setConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  render() {
    const { open, modalType } = this.state;
    const {
      otp,
      userName,
      email,
      mobileNo,
      errorMsg,
      password,
      isSave,
    } = this.state;
    const passwordError = errorMsg.password;
    const confirmPasswordError = errorMsg.confirmPassword;
    let userProps = {
      errorMsg,
      userName,
      isSave,
      email,
      mobileNo,
      otp,
      passwordError,
      password,
      confirmPasswordError,
      registerUser: this.registerUser,
      userLogin: this.userLogin,
      onEnterUserName: this.onEnterUserName,
      onValidateUserName: this.onValidateUserName,
      onValidatePassword: this.onValidatePassword,
      setEmail: this.setEmail,
      setMobileNo: this.setMobileNo,
      setSignIn: this.setSignIn,
      setPassword: this.setPassword,
      setOtp: this.setOtp,
      setConfirmPassword: this.setConfirmPassword,
      confirmPasswordCheck: this.confirmPasswordCheck,
      setForgotPassword: this.setForgotPassword,
      setRegiterModal: this.setRegiterModal,
      verifyUser: this.verifyUser,
      resetPassword: this.resetPassword,
    };
    console.log(this.props);
    const { loginMode } = this.props;
    return (
      <div>
        <div className="modal-dialog modal-xl">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal-content"
            open={open}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open} style={{ transition: "opacity 0.15s linear" }}>
              <div className="paper">
                {loginMode == "register" && (
                  <UserRegistration {...userProps} {...this.props} />
                )}
                {loginMode == "login" && (
                  <UserLogin {...userProps} {...this.props} />
                )}
                {modalType === "accountVerify" && (
                  <UserAccountVerify {...userProps} {...this.props} />
                )}
                {loginMode === "forgotPassword" && (
                  <UserForgotPassword {...userProps} {...this.props} />
                )}
                {loginMode === "enterNewPassword" && (
                  <UserNewPassword {...userProps} {...this.props} />
                )}
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
