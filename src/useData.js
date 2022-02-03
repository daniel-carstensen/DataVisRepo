import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvPath = "https://raw.githubusercontent.com/daniel-carstensen/DataVisRepo/main/aqi_by_state_2021.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
        let isMounted = true;
        const row = d => {
          console.log(d)
          return d;
        };
        csv(csvPath, row).then( data => { 
          if (isMounted) setData(data)
        })
      }, []);
  return data;
}; 