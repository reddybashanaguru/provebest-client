let initialState = {
    isFetching: false,
    error: null,
    data: null
}

const DO_LOGIN = "DO_LOGIN";


export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case DO_LOGIN + "_PENDING":
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case DO_LOGIN + "_FULFILLED":
            return {
                ...state,
                isFetching: false,
                error: null,
                user: action.payload.body.entities[0],
                permissions: action.payload.body.permissionJson
            };
        case DO_LOGIN + "_REJECTED":
            return {
                ...state,
                isFetching: false,
                error: action.payload.body ? action.payload.body.status.statusMessage : "Error Connecting: Server not reachable",
                data: null
            };
        default:
            return state;
    }
}