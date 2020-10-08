import styled from "styled-components"

export const StyledButton = styled.button`
    background-color:blue;
`;

type ButtonChuckNorrisProps = {width:number}
export const ButtonChuckNorris = styled(StyledButton)`
    width:${(props:ButtonChuckNorrisProps)=>props.width || 250}px;
`;