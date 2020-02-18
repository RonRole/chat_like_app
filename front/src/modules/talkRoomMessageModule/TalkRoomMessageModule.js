import TalkRoomMessageActoins from "./TalkRoomMessageActoins";
import TalkRoomMessageReducer from "./TalkRoomMessageReducer";
import talkRoomMessageSaga from "./TalkRoomMessageSaga"

export default TalkRoomMessageModule = {
    actions:TalkRoomMessageActoins,
    reducer:TalkRoomMessageReducer,
    saga   :talkRoomMessageSaga()
}