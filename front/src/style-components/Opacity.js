const { default: styled } = require("styled-components")

const Opacity = (Component) => {
    return styled(Component)`
        opacity:${props=>props.opacity};
    `
}

export default Opacity