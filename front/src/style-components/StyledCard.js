import { Card } from "react-bootstrap";

const { default: styled } = require("styled-components");

const StyledCard = styled(Card)`
    height:${props => props.size}rem;
`

export default StyledCard