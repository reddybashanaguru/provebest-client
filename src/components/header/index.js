import { connect } from "react-redux";
import { setLoginMode } from "./actions";

import Component from "./headerComponent";

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
