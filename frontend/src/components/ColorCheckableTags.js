import React from 'react';
import { Tag } from 'antd';
import ColorCheckableTag from './ColorCheckableTag';
import MColors from '../apis/MaterialsColors';
import SColors from '../apis/SettingsColors';
import TColors from '../apis/TypeColors';

class ColorCheckableTags  extends React.Component {

    state = {
        checkedTags: [],
    }

    _names = [];
    constructor(props) {
        super(props);

        switch(this.props.type) {
            case 'settings':
                this._names = Object.keys(SColors);
                break;
            case 'types':
                this._names = Object.keys(TColors);
                break;
            default:
                this._names = Object.keys(MColors);
                break;
        }

    }
    _onTagChange = (tag, checked) => {
        const { checkedTags } = this.state;
        const newCheckedTags = checked ? [...checkedTags, tag] : checkedTags.filter(t => t !== tag);
        console.log('You are interested in: ', newCheckedTags);
        this.setState({ checkedTags: newCheckedTags });
        // this.props.onTagChange(newCheckedTags);
    }
    render() {

        return (
            <div style={this.props.mainContainerStyle}>
                { this._names.map( (colorName, i) => (
    
                    <ColorCheckableTag key={colorName+i} name={colorName} type={this.props.type} onChange={this._onTagChange} />
                ))}
            </div>
            
        )
    }
    
}

export default ColorCheckableTags;