import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvPath = '/Users/danielcarstensen/PycharmProjects/DataVis/aqi_by_state_2021.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
        const row = d => {
          console.log(d)
          // d.State = d['State'];
          // d.MaxAQI = +d['Max AQI'];
          return d;
        };
        csv(csvPath, row).then(setData(data))
      }, []);
  return data;
}; 