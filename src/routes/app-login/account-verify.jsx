import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import accountVerificartion from '../../assets/images/filter/18.png'
import Button from '@material-ui/core/Button';


const UserAccountVerify = (props) => {
    const { isSave, otp, setOtp, verifyUser,
    } = props;
    return (
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
                                    onChange={(e) => setOtp(e)}
                                    placeholder="Enter Code" />
                            </div>
                            <div className="d-flex h10 bold accept-terms my-3">
                                <div class="accepted-icon"></div><span>I accept the Terms and Conditions and Privacy Policy</span>
                            </div>
                            <div className="form-group">
                                <Button
                                    className="btn btn-primary btn-block btn-md"
                                    onClick={verifyUser}>
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
}

export default UserAccountVerify;