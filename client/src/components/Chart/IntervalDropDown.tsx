import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Dropdown } from "../common/DropDown";

interface Iprops {
  [propName: string]: any;
}

const IntervalDropDown = (props:Iprops) => {
   const { selectInterval } = props;
    const intervalArr = [{unit:'MINUTE', prefix: 'm'}, {unit: 'HOUR', prefix: 'h'}, {unit: 'DAY', prefix: 'd'}]
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
  