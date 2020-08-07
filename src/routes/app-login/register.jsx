import React from 'react';
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

const UserRegistration = (props) => {
    console.log("props", props);
    const { errorMsg = {}, userName, isSave, email, mobileNo, passwordError, password,
        registerUser, onEnterUserName, onValidateUserName, onValidatePassword, setEmail,
        setMobileNo, setSignIn, setPassword
    } = props;
    return (
        <div className="root register">
            <Grid container spacing={3}>
                <Grid item md={7}>
                    <img src={loginimg} className="cover-img" alt="Logo" />
                </Grid>
                <Grid item md={5} className="bg-popup">
                    <Typography component="div">
                        <form className="modalform">
                            <div className="bolder title4">Register</div>
                            <div fontWeight={500} className="h12 my-2">Welcome ! Please confirm that you are visiting</div>
                            <div className="form-group">
                                <div>
                                    <label className="h12 bold600" for="username1">Name</label>
                                    <span className="error-msg1">{errorMsg && errorMsg.userName}</span>
                                </div>
                                <div>
                                    <TextField
                                        value={userName}
                                        type="text"
                                        onChange={(e) => onEnterUserName(e)} onKeyUp={(e) => onValidateUserName(e)}
                                        placeholder="Name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="h12 bold600" for="email1">Email</label>
                                <span className="error-msg1">{errorMsg && errorMsg.email}</span>
                                {((email === '') && isSave) ?
                                    (<span className="error-msg1">Enter the EmailId</span>) : null
                                }
                                <div>
                                    <TextField
                                        type="text"
                                        onChange={(e) => setEmail(e)}
                                        placeholder="Email" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label className="h12 bold600" >Mobile</label>
                                <span className="error-msg1">{errorMsg && errorMsg.mobileNo}</span>
                                {((mobileNo === '') && isSave) ?
                                    (<span className="error-msg1">Enter the Mobile Number</span>) : null
                                }
                                <div>
                                    <TextField
                                        type="number"
                                        onChange={(e) => setMobileNo(e)}
                                        placeholder="Mobile" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label className="h12 bold600" >Password</label>
                                <span className="error-msg1">{errorMsg && errorMsg.password}</span>
                                <div>
                                    <TextField
                                        type="password"
                                        onChange={setPassword}
                                        onKeyUp={(e) => onValidatePassword(e, passwordError, { password })}
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div class="d-flex align-items-center form-group justify-content-between">
                                <label class="d-flex align-items-center m-0" for="remember-me">
                                    <input class="mr-2 terms-input" type="checkbox" name="remember-me" id="remember-me" /><span class="checkmark"></span><span class="h10 bold accept-terms"> I accept the Terms and Conditions and Privacy Policy</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <Button
                                    className="btn btn-primary btn-block btn-md"
                                    onClick={registerUser}>
                                    Sign Up
                                </Button>
                            </div>
                            <div className="bold500 h12 text-center">Already have an account? <span class="link" onClick={setSignIn}>Sign in</span></div>
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
}

export default UserRegistration;