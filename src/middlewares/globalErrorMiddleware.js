export default function globalErrorMiddleware() {
    return next => action => {

        // If not a response, continue on
        if (!action.payload || !action.payload.body) {
            return next(action);
        }

        // If not success then reject
        if (!action.payload.body.success) {
            let type = action.type.split("_");
            type.splice(-1, 1);
            type = type.join("_") + "_REJECTED"

            action.type = type
        }

        return next(action);
    };
}
