import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getOrderDetails } from './actions';

import Component from "./app-login";

function mapDispatchToProps(dispatch) {
    return {
        getOrderDetails: (id) => {
            dispatch(getOrderDetails(id));
        }
    };
}

function mapStateToProps(state) {
    return {
        ordersEditDetails: state.orderEditReducer.ordersDetails,
        isFetching: state.orderEditReducer.isFetching,
        error: state.orderEditReducer.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

