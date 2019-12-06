import React from 'react';
import { Menu, Icon, Radio, Typography, Divider  } from 'antd';
import { connect } from 'react-redux';
import MColors from '../apis/MaterialsColors';
import SColors from '../apis/SettingsColors';
import TColors from '../apis/TypeColors';
import { findMaterialByColor } from '../utils'
import { CirclePicker } from 'react-color';
import { changeQuery } from '../redux/actions/furniture';

const { SubMenu } = Menu;
const settings = Object.keys(SColors);
settings.unshift('Any')
const types = Object.keys(TColors);
types.unshift('Any')
class CatalogFilter  extends React.Component {


    _onColorChange = (color) => {
        
        // this.setState({ color: color.hex });
        this.props.changeQuery({ material: findMaterialByColor(color.hex), page: 1});
    }

    _onTypeChange = (e) => {
        const type = e.target.value;
        this.props.changeQuery({ type: type === 'Any' ? null : type, page: 1});
    }

    _onSettingChange = (e) => {
        const setting = e.target.value;
        this.props.changeQuery({ setting: setting === 'Any' ? null : setting, page: 1});
    
    }

    render() {

        const { type, setting, material } = this.props.query;
        const typeValue = type? type : 'Any';
        const settingValue = setting? setting : 'Any';
        const materialColor = material? MColors[material] : 'transparent';

        return (
            <div style={{ width: '100%'}}>
                <Typography.Title level={3} style={{ width: '100%', textAlign: 'center', paddingTop: '50px'}}> Filters </Typography.Title>
                <div style={{paddingLeft: 30, paddingRight: 30}}>
                    <Divider/>
                </div>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: '100%', paddingLeft: 10, paddingRight: 10, border: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['type-filter', setting? 'setting-filter' : null, material? 'materials-filter' : null  ]}
                    mode="inline"
                >
                    
                    <SubMenu
                        key="type-filter"
                        title={
                            <span> <Icon type="setting" /> <span>By Type</span> </span>
                        }
                    >
                        <Menu.ItemGroup key="type-filter-content">
                            <Radio.Group defaultValue={typeValue} buttonStyle="solid" style={{ width: '100%'}} onChange={this._onTypeChange} >
                                
                                {
                                    types.map( (type) => (
                                        <Radio.Button key={type} style={radioButtonStyle} value={type}>{type}</Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        </Menu.ItemGroup>
                    </SubMenu>

                    
                    <SubMenu
                        key="setting-filter"
                        title={
                            <span><Icon type="appstore" /><span>By Settings</span></span>
                        }
                    >
                        <Menu.ItemGroup key="setting-filter-content">
                            <Radio.Group defaultValue={settingValue} buttonStyle="solid" style={{ width: '100%'}} onChange={this._onSettingChange}>
                                {
                                    settings.map( (setting) => (
                                        <Radio.Button key={setting} style={radioButtonStyle} value={setting}>{setting}</Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        </Menu.ItemGroup>
                
                    
                    </SubMenu>

                    <SubMenu
                        key="materials-filter"
                        title={
                            <span>
                            <Icon type="mail" />
                            <span>Materials and Finishes</span>
                            </span>
                        }
                    >
                        <Menu.ItemGroup key="materials-filter-content">
                            <CirclePicker 
                                color={materialColor}
                                colors={ Object.values(MColors)}
                                onChangeComplete={this._onColorChange}
                            />
                        </Menu.ItemGroup>
                    </SubMenu>

                </Menu>
                
            </div>
            
        )
    }
    
}

const radioButtonStyle = {
    display: "block",
    marginBottom: "5px",
    borderRadius: "3px",
    width: '100%',
}
const mapStateToProps = state => {
    return {
        query: state.furniture.query
    }
}
export default connect(mapStateToProps, { changeQuery })(CatalogFilter);