import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import forgotPasswordzImg from '../../assets/images/filter/19.png'
import Button from '@material-ui/core/Button';

const UserNewPassword = (props) => {
    console.log("props", props);
    const { errorMsg = {}, passwordError, password, confirmPasswordError, confirmPassword, confirmPasswordCheck, onValidatePassword, setPassword,
        setConfirmPassword,
    } = props;
    return (
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
                                        onChange={(e) => setPassword(e)}
                                        onKeyUp={(e) => onValidatePassword(e, passwordError, { password })}
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label className="h12 bold600" for="userPwd1">Confirm Password</label>
                                <span className="error-msg1">{errorMsg && errorMsg.confirmPassword}</span>
                                <div>
                                    <TextField
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e)}
                                        onKeyUp={(e) => onValidatePassword(e, confirmPasswordError, { confirmPassword })}
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <Button
                                    className="btn btn-primary btn-block btn-md"
                                    onClick={confirmPasswordCheck}>
                                    Save and Continue
                           </Button>
                            </div>
                        </form>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserNewPassword;