const { default: styled } = require("styled-components")

const Cursor = (Component) => {
    return styled(Component)`
        cursor:${props=>props.cursor}
    `
}

export default Cursor