import React from 'react';

//this is a component by the way!
//value is the unique ID, label is the string displyed in the menu
////onChange is an event listener, that's waiting to see if the dropdown value changes. It will then change that value and displ;ay the label

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {/* map unpacks the options array into a set of pairs and then does something witch each one! */}
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {/* we pull the label out to display it. */}
        {label}
      </option>
    ))}
  </select>
);

