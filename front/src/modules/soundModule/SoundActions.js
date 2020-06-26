export const SoundActionTypes = {
    START_BGM : 'START_BGM' 
}

export default {
    startBgm : () => {
        return {
            type : SoundActionTypes.START_BGM
        }
    }
}