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

    state= {
        currentPage:"home",
    }

    _handleNavbarClick = (e) => {
        const key = e.key;
        this.setState({ currentPage: key });
        if(key === 'log-out') {
            this.props.logoutUser();
            // this.props.history.push('/')
        }

    }
    
    _getAuthLinks = () => {
        const links = [];

        if(this.props.auth.isAuthenticated) {
            links.push(          
                <Menu.Item key="log-out">
                    <Link to="/">
                        <Icon type="logout" />
                        Log out
                    </Link>
                </Menu.Item>
            );

            links.push(          
                <Menu.Item key="my-account">
                    <Link to="/myAccount">
                        <Icon type="user" />
                        My Account
                    </Link>
                </Menu.Item>
            );

        } else {
            links.push( 
                <Menu.Item key="log-in">
                    <Link to="/login">
                        <Icon type="user" />
                        Log in
                    </Link>
                </Menu.Item>
            );
            links.push(
                <Menu.Item key="sign-up">
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
                            theme={ () => 'dark'}
                            mobileBreakPoint={768}
                            activeLinkKey={this.state.currentPage}
                            mobileMenuContent={
                                isMenuShown => isMenuShown ? <Button type="link" icon="close-circle" /> : <Button type="link" icon="menu" />
                            }
                        >
                            {(onLinkClick) =>
                                <Menu mode="horizontal" theme="dark" selectedKeys={[this.state.currentPage]} onClick={this._handleNavbarClick}>
                                    <Menu.Item key="home">
                                        <Link to="/">
                                            <Icon type="home" />
                                            Home
                                        </Link>
                                    
                                    </Menu.Item>
                                    <Menu.Item key="catalog">
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