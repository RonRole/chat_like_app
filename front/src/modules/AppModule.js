//color settings
export const Variants = {
    oon:"primary",
    aon:"danger"
} 

//actions
const ActionTypes = {
    AddMessage:"AddMessage",
    LogIn:"LogIn",
    LogOut:"LogOut"
}

//action creators
export const Actions = {
    addMessage:(className = "", text) => {
        return {
            type:ActionTypes.AddMessage,
            className:className,
            text:text
        }
    },
    login: () => {
        return {
            type:ActionTypes.LogIn
        }
    },
    logout: () => {
        return {
            type:ActionTypes.LogOut
        }
    }
}

//reducer
const initialState = {
    messages: [],
    messageAreaBottom: window.innerHeight,
    isLoggedIn:false,
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.AddMessage: {
            return {
                ...state,
                messages: [                    
                    ...state.messages,
                    {
                        className:action.className,
                        text:action.text
                    }                    
                ],
                messageAreaBottom: state.messageAreaBottom+window.innerHeight,
            }
        }

        case ActionTypes.LogIn: {
            return {
                ...state,
                isLoggedIn:true
            }
        }

        case ActionTypes.LogOut: {
            return {
                ...state,
                isLoggedIn:false
            }
        }

        default: {
            return state;
        }
    }
}