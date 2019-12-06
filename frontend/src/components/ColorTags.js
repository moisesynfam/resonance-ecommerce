import React from 'react';
import { Tag } from 'antd';
import ColorTag from './ColorTag';

const ColorTags = ({names, type}) => {

    return (
        <React.Fragment>
            { names.map( (colorName, i) => (

                <ColorTag key={colorName+i} name={colorName} type={type} />
            ))}
        </React.Fragment>
        
    )
}

export default ColorTags;