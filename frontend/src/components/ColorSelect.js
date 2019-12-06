import React from 'react';
import chroma from 'chroma-js';
import colorOptions from '../apis/MaterialsColors';
import Select from 'react-select';

const keys = Object.keys(colorOptions).map(item => ({value: item, label: item, color: colorOptions[item]}));
console.log({keys});
class ColorSelect extends React.Component {
    
    colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = chroma(data.color);
          return {
            ...styles,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? data.color
              : isFocused
              ? color.alpha(0.1).css()
              : color.alpha(0.5).css(),
            color: isDisabled  ? '#ccc' :  (chroma.contrast(color, 'white') > 2  ? color.css() : color.darken(2).css()),
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.7).css()),
            },
          };
        },
        multiValue: (styles, { data }) => {
          const color = chroma(data.color);
          return {
            ...styles,
            backgroundColor: color.alpha(0.7).css(),
          };
        },
        multiValueLabel: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                color: (chroma.contrast(color, 'white') > 2  ? color.css() : color.darken(2).css()),
            }
        },
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: data.color,
          ':hover': {
            backgroundColor: data.color,
            color: 'white',
          },
        }),
    };
    render() {
        return(
            <Select
                closeMenuOnSelect={false}
                styles={this.colourStyles}
                isMulti
                options={keys}
                
            />
        )
    }
}

export default ColorSelect;