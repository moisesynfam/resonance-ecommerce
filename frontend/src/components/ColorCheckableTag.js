import React from 'react';
import { Tag } from 'antd';
import MColors from '../apis/MaterialsColors';
import SColors from '../apis/SettingsColors';
import TColors from '../apis/TypeColors';
import chroma from 'chroma-js';


const ColorCheckableTag = ({name, type, onChange}) => {
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
        <Tag.CheckableTag 
            
            color={ Colors[name]} 
            onChange={checked => onChange(name, checked)}
            style={{color: chroma.contrast(color, 'white') > 2 ? color.brighten(2).css() : color.darken(2).css(), fontSize:20 }}
        > 
            {name} 
        </Tag.CheckableTag>
    )
}

export default ColorCheckableTag;