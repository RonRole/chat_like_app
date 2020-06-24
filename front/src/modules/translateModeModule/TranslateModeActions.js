export const TranslateModeActionTypes = {
    CHANGE_TRANSLATE_MODE_DESCRIPTION : 'CHANGE_TRANSLATE_MODE_DESCRIPTION'
}

export default {
    changeDescription : ({
        translateMode,
        description
    }) => {
        return {
            type : TranslateModeActionTypes.CHANGE_TRANSLATE_MODE_DESCRIPTION,
            translateMode,
            description
        }
    }
}