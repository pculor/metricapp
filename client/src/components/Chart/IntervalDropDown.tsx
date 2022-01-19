import React from 'react';
import styled from "styled-components";
import { Dropdown } from "../common/DropDown";
import { Iprops } from '../common/interfaces'


const IntervalDropDown = (props:Iprops) => {
   const { selectInterval } = props;
    const intervalArr = [{unit:'MINUTE', prefix: 'min'}, {unit: 'HOUR', prefix: 'hour'}, {unit: 'DAY', prefix: 'day'}]
    const dropDownHandler = (input: any) => {
      selectInterval(input.target.value);
    };
    return (
      <StyleMH>
        <Dropdown onChange={dropDownHandler}>
          {intervalArr.map((inv, index) => {
                return (
                  <option key={index} value={inv.prefix}>
                    {inv.unit}
                  </option>
                );
              })
            }
        </Dropdown>
      </StyleMH>
    );
  };
  
  const StyleMH = styled.div`
    width: 100px;
    color: ${({theme})=> theme.colors.white};
  
    display: flex;
    align-items: center;
    justify-content: space-between;
  
    select {
      margin-right: ${({theme})=> theme.spacing.mediumSpace3};
    }
  
    background-color: ${({theme})=> theme.colors.lightGrey};
  `;
  
  export default IntervalDropDown;
  