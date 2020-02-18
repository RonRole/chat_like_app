import { LogActions } from "../LoginModule";
import LogReducer from "./LogReducer";
import logSaga from "./LogSaga";

export default {
    actions: LogActions,
    reducer: LogReducer,
    saga   : logSaga
}