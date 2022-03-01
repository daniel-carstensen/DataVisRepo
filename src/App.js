import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, max, format, scaleBand, scaleSequential, padding, colorbrewer } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';

<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

const width = 960;
const menuHeight = 75;
const height = 1200 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 190 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 150;

const attributes = [ //we're going to use this array of constants in the getLabel function
  { value: 'Max AQI', label: 'Max AQI' },
  { value: 'Median AQI', label: 'Median AQI' },
  { value: 'Unhealthy for Sensitive Groups Days', label: 'Unhealthy for Sensitive Groups Days'},
  { value: 'Unhealthy Days', label: 'Unhealthy Days' },
];

const getLabel = value => { //this is how we update the axes everytime the dropdown gets clicked!
  for(let i = 0; i < attributes.length; i++){
    if(attributes[i].value === value){
      return attributes[i].label;
    }
  }
};

const App = () => {
  const data = useData(); //check useData file

  const initialXAttribute = 'Max AQI'; //default
  const [xAttribute, setXAttribute] = useState(initialXAttribute); //initalise our X dropdown as ^
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute); // this will allow us to update on every refresh

  const [yAttribute, setYAttribute] = useState('State');
  const yAxisLabel = 'State';

  if (!data) { //just a quick check if data is ready
    return <pre>Loading...</pre>;
  }

// dimensions for our graph
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const siFormat = format('.2s'); //sets how many decimals to have
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain([0, max(data, d => xValue(d))])
    .range([0, innerWidth])

 
  const yScale = scaleBand()
    .domain(data.map(d => d['State']))
    .range([0, innerHeight])
    .padding(0.1);

  return (
    <>
    <div>
      <label for="x-select">X:</label>
      <Dropdown
        options={attributes}
        id="x-select"
        selectedValue={xAttribute} //We've done this before, just setting up the event listener and initailising its value.
        onSelectedValueChange={setXAttribute}
      />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} data={data}/>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + yAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            xValue={xValue}
            xScale={xScale}
            yScale={yScale}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;