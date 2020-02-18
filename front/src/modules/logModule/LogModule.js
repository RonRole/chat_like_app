import LogReducer from "./LogReducer";
import logSaga from "./LogSaga";
import LogActions from "./LogActions";

export default {
    actions: LogActions,
    reducer: LogReducer,
    saga   : logSaga
}