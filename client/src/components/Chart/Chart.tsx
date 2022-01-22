import React from 'react';
import styled from "styled-components";
import * as V from 'victory';
import { Irecord } from '../common/interfaces'

const {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryLegend,
    VictoryAxis,
  } = V;


  const processedData = (records: Irecord[], interval: string) =>
    records.map((record:Irecord, i:number) => {
          const timing_format: any = record._time?.slice(0, 19).replace('T', ' ');
          
          let timing: number = new Date(timing_format).getMinutes();
          if (interval === 'hour') timing = new Date(timing_format).getHours();
          if (interval === 'day') timing = new Date(timing_format).getDay();
          return {
            timeline: timing,
            metric: record._value}
        });

const Chart = (props:any) => {
    const { records, interval } = props;

    if (!records.length) {
      return (
        <Container className="table">
        <div>
          <NoFeedback>No Metrics for selected Timeline</NoFeedback>
        </div>
        </Container>
      );
    }

    const dataPlot = processedData(records, interval);
    
    return (
        <Container className="table">

            <VictoryChart
                domainPadding={20}
                width={1000}
                height={1000}
                style={{ parent: { maxWidth: '90%' } }}
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
              >
                <VictoryLegend
                  x={5}
                  y={8}
                  gutter={10}
                  orientation="horizontal"
                  data={[
                    { name: 'x axis - time', symbol: { fill: '#393D4A' } },

                    {
                      name: 'y axis - metric weight',
                      symbol: { fill: '#393D4A' }
                    }
                  ]}
                />
                <VictoryAxis tickValues={dataPlot.map(axis => axis.timeline)} />
                <VictoryAxis
                  dependentAxis
                  tickFormat={x => (Number.isInteger(x) ? x : '')}
                />

                <VictoryBar
                  style={{ data: { fill: '#393D4A' } }}
                  data={dataPlot}
                  // data accessor for x values
                  x="timeline"
                  // data accessor for y values
                  y="metric"
                />
            </VictoryChart>
            
        </Container>
    ) 
}

export default Chart;

const Container = styled.div`
    background-color: white;
    max-width: 1000px;
    overflow-y: scroll;
    width: 100%;
    height: 80vh;
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