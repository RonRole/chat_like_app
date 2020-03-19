export const ModalActionTypes = {
    SHOW_MODAL_OF : "SHOW_MODAL_OF",
    CLOSE_MODAL_OF : "CLOSE_MODAL_OF"
}

export default {
    showModalOf : (modalName) => {
        return {
            type : ModalActionTypes.SHOW_MODAL_OF,
            modalName
        }
    },
    closeModalOf : (modalName) => {
        return {
            type : ModalActionTypes.CLOSE_MODAL_OF,
            modalName
        }
    }
}