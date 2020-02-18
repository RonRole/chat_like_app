import TalkRoomMessageActoins from "./TalkRoomMessageActoins";
import TalkRoomMessageReducer from "./TalkRoomMessageReducer";
import talkRoomMessageSaga from "./TalkRoomMessageSaga";


export default {
    actions:TalkRoomMessageActoins,
    reducer:TalkRoomMessageReducer,
    saga   :talkRoomMessageSaga
}