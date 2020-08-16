import axios from "axios";
// import AppConstant from "../../constant/AppConstant";

const SET_LOGIN_MODE = "SET_LOGIN_MODE";
// const ADMIN_DASHBOARD = "ADMIN_DASHBOARD";
// const CUSTOMER_DASHBOARD = "CUSTOMER_DASHBOARD";

//Set login mode
export const setLoginMode = (payload) => (dispatch, getState) => {
  return dispatch({
    type: SET_LOGIN_MODE,
    payload,
  });
};
// export function toggleDrawer() {
//   return (dispatch, getState) => {
//     dispatch({
//       type: SET_LOGIN_MODE,
//       payload: {},
//     });
//   };
// }
