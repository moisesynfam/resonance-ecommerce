import React from 'react';
import { Tag } from 'antd';
import MColors from '../apis/MaterialsColors';
import SColors from '../apis/SettingsColors';
import TColors from '../apis/TypeColors';
import chroma from 'chroma-js';


const ColorTag = ({name, type}) => {
    let Colors = MColors;
    switch (type) {
        case 'settings':
            Colors = SColors;
            break;
        case 'types': 
            Colors = TColors;
            break;
        default:
            Colors = MColors;
            break;
      
    }
    const color = chroma( Colors[name]);
    return (
        <Tag color={ Colors[name]} 
            style={{color: chroma.contrast(color, 'white') > 2 ? color.brighten(2).css() : color.darken(2).css() }}
        > 
            {name} 
        </Tag>
    )
}

export default ColorTag;