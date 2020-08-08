import { connect } from "react-redux";
import { setLoginMode } from "../../components/header/actions";

import Component from "./app-login";

function mapDispatchToProps(dispatch) {
  return {
    setLoginMode: (loginMode) => {
      dispatch(setLoginMode(loginMode));
    },
  };
}

function mapStateToProps(state) {
  return {
    loginMode: state.loginModeReducer.loginMode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
