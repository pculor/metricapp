import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { axios } from '../../utils/axios';
import Chart from "./Chart";
import IntervalDropDown from "./IntervalDropDown";


const Timeline = (props:any) => {
    const [records, setRecords] = useState([]);
    const [interval, setInterval] = useState("");

    const getMetrics = (interval: string) => {
        if(interval){
            axios.get(`metrics?interval=${interval}?avg=5?start=1`)
            .then((res)=>{
                const { data: {
                    body
                }} = res;
                console.log(body, '<<<=== chart');
                setRecords(body);
            }); 
        } else {
            axios.get(`metrics?interval=${interval}?avg=5?start=1`)
            .then((res)=>{
                const { data: {
                    body
                }} = res;
                console.log(body, '<<<=== chart');
                setRecords(body);
            });
        }
        
    }

    const selectInterval =(interval: string) =>{
        setInterval(interval);
    }

    useEffect(()=>getMetrics(interval),[interval])

    if (!records.length) {
        return (
          <div>
            <NoFeedback>No Metrics for selected Timeline</NoFeedback>
          </div>
        );
      }
    return (
        <Container className="table">
        <IntervalDropDown
        selectInterval={selectInterval}
         />
        <Chart records={records}/>
        </Container>
    ) 
}

export default Timeline;

const Container = styled.div`
    background-color: white;
    max-width: 1000px;
    overflow-y: scroll;
    width: 100%;
    padding: 30px 15rem;
    border: 1px solid #C3CFD9;
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 5rem;
    
`;


const NoFeedback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({theme})=> theme.fonts.bodyHero}; 
  background-color: ${({theme})=> theme.colors.white}; 
  width: 75%;
  height: 30vh;
  margin: 0 auto;
`;