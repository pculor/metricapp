import styled from "styled-components";


export const Dropdown = styled.select`
  font-size: ${({theme})=> theme.fonts.buttonText};
  padding: 6px ${({theme})=> theme.fonts.extraSmallSpace};
  background-color: ${({theme})=> theme.colors.white};
  color: ${({theme})=> theme.colors.black};
  border-color: ${({theme})=> theme.colors.black};
  font-weight: 400;
  min-width: 160px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0.8rem 2.5rem 0 rgba(40, 51, 63, 0.11);
  transition: all 100ms ease-in-out;
  cursor: pointer;
  &:active {
    opacity: 0.8;
    box-shadow: 0 6px 10px 0 rgba(40, 51, 63, 0.11);
  }
`;