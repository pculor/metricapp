import React from 'react';
import styled from "styled-components";


const I = styled.input`
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    border: 1px solid #C3CFD9;
    border-radius: 6px;
    padding: 10px;
    width: 180px;
    margin: 0 0 10px 0;

    &:focus {
        transition: all 0.5s;
        box-shadow: 0 0 3px #ddd;
        outline: 0;
    }
`;

const StyledInput = ({ ...props })=>{
    return <I { ...props }/>
};

export default StyledInput;