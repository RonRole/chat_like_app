import styled from 'styled-components'


const Height = styled.div`
    height:${props => props.size}px;
`

Height.Rem = styled.div`
    height:${props => props.size}rem;
`

Height.Percent = styled.div`
    height:${props => props.size}%;
`

export default Height