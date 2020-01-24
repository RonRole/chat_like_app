import Aon from "../components/Aon"
import Oon from "../components/Oon"
import React from 'react'

//actions
export const ActionTypes = {
    Oon:"Oon",
    Aon:"Aon"
}

//action creators
export const Actions = {
    oon:() => {
        return {
            type:ActionTypes.Oon,
        }
    },
    aon:() => {
        return {
            type: ActionTypes.Aon,
        }
    }
}

//reducer
const initialState = {
    messageKey:0,
    messageComps: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.Oon: {
            return {
                messageKey: state.messageKey+1,
                messageComps: [                    
                    <Oon key= {state.messageKey}/>,
                    ...state.messageComps
                ]
            }
        }

        case ActionTypes.Aon: {
            return {
                messageKey: state.messageKey+1,
                messageComps: [                    
                    <Aon key= {state.messageKey}/>,
                    ...state.messageComps
                ]
            }
        }

        default: {
            return state;
        }
    }
}