import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, max, format, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const attributes = [ //we're going to use this array of constants in the getLabel function
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' }
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

  const initialXAttribute = 'petal_length'; //default
  const [xAttribute, setXAttribute] = useState(initialXAttribute); //initalise our X dropdown as ^
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute); // this will allow us to update on every refresh

  const initialYAttribute = 'sepal_width'; //same as above
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) { //just a quick check if data is ready
    return <pre>Loading...</pre>;
  }

// dimensions for our graph
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const siFormat = format('.2s'); //sets how many decimals to have
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))// extent is shorthand for minmax
    .range([0, innerWidth])
    .nice(); //makes last points on scale round numbers
 
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

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
      <label for="y-select">Y:</label>
      <Dropdown
        options={attributes}
        id="y-select"
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
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
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;