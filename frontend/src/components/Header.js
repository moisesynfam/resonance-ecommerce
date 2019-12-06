import React from 'react';
import './Header.css';
import { Layout, Menu, Button, Typography, Row, Col, Icon  } from 'antd';
import ResponsiveAntMenu from 'responsive-ant-menu'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../redux/actions/auth';

const { Title } = Typography;


class Header extends React.Component {

   

    constructor(props) {
        super(props);
        this.state = { width: window.innerWidth};
        
        // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
        // console.log({ width: window.innerWidth, height: window.innerHeight })
      }

    _determineRoute = () => {
        if(this.props.location.pathname.includes('/catalog')) return '/catalog';

        return this.props.location.pathname;
    }

    _handleNavbarClick = (e) => {
        const key = e.key;
        if(key === 'log-out') {
            this.props.logoutUser();
            this.props.history.push('/')
        }

    }
    
    _getAuthLinks = () => {
        const links = [];

        if(this.props.auth.isAuthenticated) {
            // links.push(          
            //     <Menu.Item key="log-out">
            //         <Link to="/">
            //             <Icon type="logout" />
            //             Log out
            //         </Link>
            //     </Menu.Item>
            // );

            links.push(          
                <Menu.SubMenu
                    key="/user"
                    title={
                        <span className="submenu-title-wrapper">
                        <Icon type="user" />
                        Hi, { this.props.auth.user.firstName }
                        </span>
                    }
                    >
                    <Menu.ItemGroup>
                        <Menu.Item key="log-out">
                            
                            Log Out
                           
                        </Menu.Item> 
                    </Menu.ItemGroup>
                    
                </Menu.SubMenu>
            );

        } else {
            links.push( 
                <Menu.Item key="/login">
                    <Link to="/login">
                        <Icon type="user" />
                        Log in
                    </Link>
                </Menu.Item>
            );
            links.push(
                <Menu.Item key="/signup">
                    <Link to="/signUP">
                        <Icon type="mail" />
                        Sign Up
                    </Link>
                </Menu.Item>
            );
            
        }  
        return links;
    }

    render() {
        return (
            <Layout.Header>
                <Row type="flex" style={{ height: '100%'}} align="bottom" justify="space-between">
                    <Col span={4}><Title level={2} ><Link className="header-logo" to="/" >RESONANCE</Link></Title></Col>
                    <Col>
                        <ResponsiveAntMenu 
                            mode={this.state.width < 768? "vertical" : 'horizontal'}
                            theme={ () => 'dark'}
                            mobileBreakPoint={768}
                            activeLinkKey={this._determineRoute()}
                            mobileMenuContent={
                                isMenuShown => isMenuShown ? <Button type="link" icon="close-circle" /> : <Button type="link" icon="menu" />
                            }
                        >
                            {(onLinkClick) =>
                                <Menu mode="horizontal" theme="dark" selectedKeys={[this._determineRoute()]} onClick={this._handleNavbarClick}>
                                    <Menu.Item key="/">
                                        <Link to="/">
                                            <Icon type="home" />
                                            Home
                                        </Link>
                                    
                                    </Menu.Item>
                                    <Menu.Item key="/catalog">
                                        <Link to="/catalog">
                                            <Icon type="shopping" />
                                            Catalog
                                        </Link>
                                    
                                    </Menu.Item>
                                    
                                    { this._getAuthLinks().map( link => (link))}
                                </Menu>
                            }
                        </ResponsiveAntMenu>
                      
                    </Col>
                </Row>
                
                
            </Layout.Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logoutUser })( withRouter(Header) );