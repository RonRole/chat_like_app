const { default: styled } = require("styled-components");

const Visible = styled.div`
    &[aria-hidden='true'] {
        display: none
    }
`

export default Visible;