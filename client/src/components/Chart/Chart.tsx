import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import * as V from 'victory';

const {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryLegend,
    VictoryAxis,
  } = V;

  interface Irecord {
    result?: string,
    table?: number,
    _start?: string,
    _stop?: string,
    _time?: string,
    _value?: number,
    _field?: string,
    _measurement?: string,
    dataSet: string,
    name?: string
}

  const processedData = (records: Irecord[]) =>
    records.map((record:Irecord, i:number) => ({
                timeline: record._time,
                metric: record._value,
            }));

const Chart = (props:any) => {
    const { records } = props;
    const dataPlot = processedData(records);
    return (
        <Container className="table">

            <VictoryChart
                domainPadding={10}
                height={1000}
                width={1000}
                style={{ parent: { maxWidth: '90%' } }}
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
              >
                <VictoryLegend
                  x={3}
                  y={6}
                  gutter={3}
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
                  x="time"
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
    height: 50vh;
    padding: 30px 15rem;
    border: 1px solid #C3CFD9;
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 5rem;
    
`;