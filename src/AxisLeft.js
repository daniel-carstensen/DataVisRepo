export const AxisLeft = ({yScale}) =>
  yScale.domain().map(tickValue => (
    <text
      key={tickValue}
      style={{ textAnchor: 'end' }} //aligns text to end
      x={-3} // gives us a bit of space on the left
      dy=".32em" // helps center
      y={yScale(tickValue) + yScale.bandwidth() / 2}
    >
      {tickValue}
    </text>
  ));