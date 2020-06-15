import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import loginimg from '../../assets/images/filter/17.png'
import accountVerificartion from '../../assets/images/filter/18.png'
import forgotPasswordzImg from '../../assets/images/filter/19.png'
import Button from '@material-ui/core/Button';
import UserRegistration from './register';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modalType: null,
            userName: '',
            email: '',
            mobileNo: '',
            password: '',
            confirmPassword: '',
            isSave: false,
            errorMsg: { userName: '', password: '', confirmPassword: '', otp: '' },
            otp: '',
        }
    }

    componentDidMount() {
        axios.get(`https://provebest-api.herokuapp.com/profile/all`)
            .then(res => {
                console.log(res.data, 'publicapi');
            })
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    resetPassword = () => {
        this.setState({ modalType: 'enterNewPassword' });
    }

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
        const SpecialCharactersCheck = new RegExp("^(?=.*[!@#\$%\^&\*])");
        this.setState({ isSave: true });

        let userNameError = errorMsg.userName;
        let passwordError = errorMsg.password;

        if (userName === '') {
            userNameError = 'Enter the User Name';
        }
        if (password === '') {
            passwordError = 'Enter the password'
        }
        if (password !== '') {
            if (!numericCheck.test(password)) {
                passwordError = 'Atleast one Numeric character should be present'
            }
            if (!SpecialCharactersCheck.test(password)) {
                passwordError = "Atleast one special character should be present"
            }
            if (password.length < 6) {
                passwordError = "Password length should be greater than 6";
            }
        }
        this.setState({
            errorMsg: {
                ...errorMsg,
                userName: userNameError,
                password: passwordError
            }
        })
        if (userName === '' || email === '' || mobileNo === '' || password === '' || userNameError !== '' || passwordError !== '') {
            return null;
        }
        else {
            axios({
                method: 'post',
                url: 'https://provebest-api.herokuapp.com/register/validate',
                headers: { 'Content-Type': 'application/json' },
                data
            }).then(res => {
                this.setState({ modalType: 'accountVerify', isSave: false });
            }).catch(error => {
                alert(error.response.data.errors[0].msg);
                console.log(error.response.data, 'errorsdata');
            });
        }

    }

    onValidateUserName = (e) => {
        const { errorMsg } = this.state;
        const numericCheck = new RegExp("(?=.*[0-9])");
        const SpecialCharactersCheck = new RegExp("(?=.*[!@#\$%\^&\*])")
        let userNameError = errorMsg.userName;
        if (!SpecialCharactersCheck.test(e.target.value) || !numericCheck.test(e.target.value)) {
            userNameError = '';
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
            }
        })
    }

    onValidatePassword = (e, error, errorState) => {
        const { errorMsg } = this.state;
        const numericCheck = new RegExp("(?=.*[0-9])");
        const SpecialCharactersCheck = new RegExp("(?=.*[!@#\$%\^&\*])");
        let passwordError = error;
        console.log(passwordError, 'passwordError');
        const value = e.target.value;
        if (numericCheck.test(e.target.value) && SpecialCharactersCheck.test(e.target.value) && (value.length > 6)) {
            passwordError = '';
        }
        console.log(numericCheck.test(e.target.value), '1', SpecialCharactersCheck.test(e.target.value), '2', value.length > 6);
        if (errorState === 'password') {
            this.setState({
                errorMsg: {
                    ...errorMsg,
                    password: passwordError,
                }
            })
        }
        if (errorState === 'confirmPassword') {
            this.setState({
                errorMsg: {
                    ...errorMsg,
                    confirmPassword: passwordError,
                }
            })
        }
    }

    verifyUser = () => {
        const { userName, email, mobileNo, password, otp } = this.state
        this.setState({ isSave: true })
        const data = {
            name: userName,
            email: email,
            mobileNumber: mobileNo,
            password: password,
            confirmPassword: password,
        }
        if (otp === '') {
            return null;
        }
        axios({
            method: 'post',
            url: 'https://provebest-api.herokuapp.com/register',
            headers: { 'Content-Type': 'application/json' },
            data: data
        }).then(response => {
            const { status, data = {} } = response;
            const { message = '' } = data;
            //TODO:Toast message comes here !
            alert(message);
            if (status == 200) {
                this.props.history.push('/homepage/');
            }
        }).catch(error => {
            console.error(error);
            alert(error ? error.code : "something went wrong !")
        });
        this.setState({ modalType: null, open: false, userName: '', email: '', password: '', confirmPassword: '', })
    }

    userLogin = () => {
        const { email, password, errorMsg } = this.state
        const data = {
            email: email,
            password: password,
        }
        this.setState({ isSave: true });
        let userNameError = '';
        let passwordError = '';
        if (email === '') {
            userNameError = 'Enter the User Name';
        }
        if (password === '') {
            passwordError = 'Enter the password'
        }
        this.setState({
            errorMsg: {
                ...errorMsg,
                userName: userNameError,
                password: passwordError
            }
        }, () => {
            console.log(userNameError, 'userNameError', passwordError, 'passwordError');
            if (email === '' || password === '' || userNameError !== '' || passwordError !== '') {
                return null;
            } else {
                axios({
                    method: 'post',
                    url: 'https://provebest-api.herokuapp.com/login/',
                    headers: { 'Content-Type': 'application/json' },
                    data: data
                }).then(res => {
                    alert("Logged In successfully");
                    this.props.history.push('/homepage/');
                    this.setState({ modalType: null, open: false })
                }).catch(error => {
                    alert(error.response.data.errors[0].msg);
                    console.log(error.response.data, 'errorsdata');
                });

            }
        })
    }


    confirmPassword = () => {
        const { email, password, confirmPassword, errorMsg } = this.state
        const data = {
            email: email,
            password: password,
            confirmPassword: password,
        }
        this.setState({
            errorMsg: {
                ...errorMsg,
                password: this.passwordCheck(password, errorMsg.password),
            }
        }, () => {
            console.log(password !== confirmPassword, 'cond');
            console.log(password === '', confirmPassword === '', (errorMsg && errorMsg.password) !== "", 'check')
            console.log(errorMsg, 'errorMsghhhhhhhhhh');
            if (password === '' || (errorMsg && errorMsg.password) !== "") {
                return null;
            }
            else if (password !== confirmPassword) {
                alert("passwords are not matching");
                return null;
            }
            else {
                axios({
                    method: 'post',
                    url: 'https://provebest-api.herokuapp.com/resetPassword',
                    headers: { 'Content-Type': 'application/json' },
                    data: data
                }).then(res => {
                    console.log(res);
                })
                alert("Passwor Changed Successfully");
                this.setState({ modalType: null, open: false, password: '', confirmPassword: '' })
            }
        })


    }

    passwordCheck = (pass, error) => {
        const numericCheck = new RegExp("(?=.*[0-9])");
        const SpecialCharactersCheck = new RegExp("(?=.*[!@#\$%\^&\*])");
        let errors = error;
        if (pass === '') {
            errors = 'Enter the password'
        }
        if (pass !== '') {
            if (!numericCheck.test(pass)) {
                errors = 'Atleast one Numeric character should be present'
            }
            if (!SpecialCharactersCheck.test(pass)) {
                errors = "Atleast one special character should be present"
            }
            if (pass.length < 6) {
                errors = "Password length should be greater than 6";
            }
        }
        return errors;
    }

    onEnterUserName = (e) => {
        const trimmeduserName = e.target.value.replace(/  +/g, ' ')
        this.setState({ userName: trimmeduserName })
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    setMobileNo = (e) => {
        this.setState({ mobileNo: e.target.value })
    }

    setSignIn = (e) => {
        this.setState({ modalType: 'login', userName: '', email: '', mobileNo: '', password: '' })
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    renderModalContents = (modal) => {
        const { modalType, userName, email, mobileNo, errorMsg, password, confirmPassword, isSave, otp } = this.state;
        const passwordError = errorMsg.password;
        const confirmPasswordError = errorMsg.confirmPassword;
        let userProps = {
            errorMsg, userName, isSave, email, mobileNo, passwordError, password, registerUser: this.registerUser,
            onEnterUserName: this.onEnterUserName, onValidateUserName: this.onValidateUserName, onValidatePassword: this.onValidatePassword,
            setEmail: this.setEmail, setMobileNo: this.setMobileNo, setSignIn: this.setSignIn, setPassword: this.setPassword
        }
        switch (modal) {
            case 'register':
                return (
                    //Register Modal
                    <UserRegistration {...userProps} />
                )
            case 'login':
                return (
                    //LOGIN PAGE
                    <div className="root">
                        <Grid container spacing={3}>
                            <Grid item md={7}>
                                <img src={loginimg} className="cover-img" alt="Logo" />
                            </Grid>
                            <Grid item md={5} className="bg-popup">
                                <Typography component="div">
                                    <form className="modalform">
                                        <div className="bolder title4">Sign In</div>
                                        <div fontWeight={500} className="h12 my-3">Welcome ! Please confirm that you are visiting</div>
                                        <div className="form-group">
                                            <label className="h12 bold600" for="email1">Email/Mobile</label>
                                            <span className="error-msg1">{errorMsg && errorMsg.userName}</span>
                                            <div>
                                                <TextField
                                                    type="text"
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                    placeholder="Email" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label className="h12 bold600">Password</label>
                                            <span className="error-msg1">{errorMsg && errorMsg.password}</span>
                                            <div>
                                                <TextField
                                                    type="password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center form-group justify-content-end">
                                            <span class="h10 link" onClick={() => this.setState({ modalType: 'forgotPassword' })}>Forgot your password?</span>
                                        </div>
                                        <div className="form-group">
                                            <Button
                                                className="btn btn-primary btn-block btn-md"
                                                onClick={this.userLogin}>
                                                Sign In
                                            </Button>
                                        </div>
                                        <div className="bold500 h12 text-center">Don’t have an account? <span class="link" onClick={() => this.setState({ modalType: 'register', userName: '', password: '' })}>Register</span></div>
                                        <div className="h10 backgroundLine mt-3 text-center"><span>Or</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <div className="mx-2"><i className="iconGoogleplus icon18"></i></div>
                                            <div className="mx-4"><i className="iconFacebook icon18"></i></div>
                                            <div className="mx-2"><i className="iconTwitter icon18"></i></div>
                                        </div>
                                    </form>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )
            case 'accountVerify':
                return (
                    //ACCOUNT VERIFICATION
                    <div className="root">
                        <Grid container spacing={3}>
                            <Grid item md={7}>
                                <img src={accountVerificartion} className="cover-img" alt="Logo" />
                            </Grid>
                            <Grid item md={5} className="bg-popup">
                                <Typography component="div">
                                    <form className="modalform">
                                        <div className="bolder title4">Account Verification</div>
                                        <div className="h12 my-3">Just one more step, Lets verify your account</div>
                                        <div fontWeight={500} className="h14 my-3 acc-verify">We already sent a code to your email and mobile , please check you inbox and enter the code to verify your account</div>
                                        <div className="form-group">
                                            <label className="h12 bold600" for="code">Code</label><br />
                                            {((otp === '') && isSave) ?
                                                (<span className="error-msg1">Enter the Code</span>) : null
                                            }
                                            <TextField
                                                type="number"
                                                name="code"
                                                id="code"
                                                onChange={(e) => this.setState({ otp: e.target.value })}
                                                placeholder="Enter Code" />
                                        </div>
                                        <div className="d-flex h10 bold accept-terms my-3">
                                            <div class="accepted-icon"></div><span>I accept the Terms and Conditions and Privacy Policy</span>
                                        </div>
                                        <div className="form-group">
                                            <Button
                                                className="btn btn-primary btn-block btn-md"
                                                onClick={this.verifyUser}>
                                                Verify
                                            </Button>
                                        </div>
                                        <div className="bold500 h12 text-center">Not Received any code?<span class="link ml-2">Resend</span></div>
                                    </form>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )
            case 'forgotPassword':
                return (
                    //Forgot Password
                    <div className="root forgot-password">
                        <Grid container spacing={3}>
                            <Grid item md={7} className="bg-popup">
                                <img src={forgotPasswordzImg} className="cover-img" alt="Logo" />
                            </Grid>
                            <Grid item md={5} className="bg-popup">
                                <Typography component="div">
                                    <form className="modalform">
                                        <div className="bolder title4">Forgot Password?</div>
                                        <div className="h12 my-3">We already sent a code to your email and mobile</div>
                                        <div className="form-group">
                                            <label className="h12 bold600" for="email1">EnterCode</label><br />
                                            <TextField
                                                type="number"
                                                name="code"
                                                id="code"
                                                placeholder="Enter" />
                                        </div>
                                        <div className="d-flex align-items-center form-group justify-content-end">
                                            <span class="h12 link">Resend</span>
                                        </div>
                                        <div className="form-group">
                                            <Button
                                                className="btn btn-primary btn-block btn-md"
                                                onClick={this.resetPassword}>
                                                Next
                                            </Button>
                                        </div>
                                        <div className="bold500 h12">Don’t have an account? <span className="link" onClick={() => this.setState({ modalType: 'register' })}>Register</span><span className="link h12 float-right" onClick={() => this.setState({ modalType: 'login' })}>Sign In</span></div>
                                    </form>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )
            case 'enterNewPassword':
                return (
                    //Enter Your new password and continue
                    <div className="root forgot-password">
                        <Grid container spacing={3}>
                            <Grid item md={7} className="bg-popup">
                                <img src={forgotPasswordzImg} className="cover-img" alt="Logo" />
                            </Grid>
                            <Grid item md={5} className="bg-popup">
                                <Typography component="div">
                                    <form className="modalform">
                                        <div className="bolder title4">Enter Your new Password</div>
                                        <div className="h12 my-3">Please enter your new password and continue</div>
                                        <div class="form-group">
                                            <label className="h12 bold600" for="userPwd1">New Password</label>
                                            <span className="error-msg1">{errorMsg && errorMsg.password}</span>
                                            <div>
                                                <TextField
                                                    type="password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    onKeyUp={(e) => this.onValidatePassword(e, passwordError, { password })}
                                                    placeholder="Password" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label className="h12 bold600" for="userPwd1">Confirm Password</label>
                                            <span className="error-msg1">{errorMsg && errorMsg.confirmPassword}</span>
                                            <div>
                                                <TextField
                                                    type="password"
                                                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                                    onKeyUp={(e) => this.onValidatePassword(e, confirmPasswordError, { confirmPassword })}
                                                    placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Button
                                                className="btn btn-primary btn-block btn-md"
                                                onClick={this.confirmPassword}>
                                                Save and Continue
                                           </Button>
                                        </div>
                                    </form>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                )
            default:
                return null;
        }
    }


    render() {
        const { open, modalType } = this.state;
        return (
            <div>
                <Button className="btn btn-primary btn-block btn-md" onClick={this.handleOpen}>
                    <span onClick={() => this.setState({ modalType: 'register' })}>Sign Up/</span>
                    <span onClick={() => this.setState({ modalType: 'login' })}>Sign In</span>
                </Button>
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
                        <Fade
                            in={open}
                            style={{ transition: 'opacity 0.15s linear' }}>
                            <div className="paper">
                                {this.renderModalContents(modalType)}
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default App;