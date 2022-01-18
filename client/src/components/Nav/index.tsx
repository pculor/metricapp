import React from 'react';
import { Link } from 'react-router-dom'
import styled from "styled-components";




const Nav = () =>{
    return (
        <StyledDiv> 
            <Link to='/' >Home</Link>
            <Link to='/chart'>Chart</Link>   
        </StyledDiv>
    )
}

export default Nav;
const StyledDiv = styled.div`
display: flex;
justify-content: flex-end;
background-color: ${({theme})=> theme.colors.mainColor}; 
li {
    list-style: none;
    padding: 1rem;
    color: ${({theme})=> theme.colors.white}
};
a {
        padding: 1rem;
        color: ${({theme})=> theme.colors.white};
        text-decoration: inherit;

        &:hover {
            color: #222;
        }
    }
`;