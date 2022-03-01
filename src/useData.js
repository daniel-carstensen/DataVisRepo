import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvPath = "https://raw.githubusercontent.com/daniel-carstensen/DataVisRepo/main/aqi_by_state_2021.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
        let isMounted = true;
        const row = d => {
          d['Max AQI'] = +d['Max AQI'];
          d['Median AQI'] = +d['Median AQI'];
          d['Unhealthy for Sensitive Groups Days'] = +d['Unhealthy for Sensitive Groups Days'];
          d['Unhealthy Days'] = +d['Unhealthy Days'];
          console.log(d)
          return d;
        };
        csv(csvPath, row).then( data => { 
          if (isMounted) setData(data)
        })
      }, []);
  return data;
}; 