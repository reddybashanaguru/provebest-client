import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import loginimg from '../../assets/images/filter/17.png'
import Button from '@material-ui/core/Button';


const UserLogin = (props) => {
    const { errorMsg = {}, setEmail, setPassword, userLogin, setForgotPassword, setRegiterModal,
    } = props;
    return (
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
                                        onChange={(e) => setEmail(e)}
                                        placeholder="Email" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label className="h12 bold600">Password</label>
                                <span className="error-msg1">{errorMsg && errorMsg.password}</span>
                                <div>
                                    <TextField
                                        type="password"
                                        onChange={(e) => setPassword(e)}
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div className="d-flex align-items-center form-group justify-content-end">
                                <span class="h10 link" onClick={setForgotPassword}>Forgot your password?</span>
                            </div>
                            <div className="form-group">
                                <Button
                                    className="btn btn-primary btn-block btn-md"
                                    onClick={userLogin}>
                                    Sign In
                            </Button>
                            </div>
                            <div className="bold500 h12 text-center">Don’t have an account? <span class="link" onClick={setRegiterModal}>Register</span></div>
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

export default UserLogin;