export const Marks = ({
    data,
    xScale,
    yScale
  }) =>
    data.map(d => (
      <rect
            className="mark"
            key={d['State']}
            x={0}//all bars start at x = 0
            y={yScale(d['State'])} // all bars start at whatever country position they are, according to our YsCale
            width={xScale(d['Max AQI'])} // self-explanatory
            height={yScale.bandwidth()} // height of bar is the bandwidth we set.
          />
    ));
  
  