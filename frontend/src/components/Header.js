import React from 'react';
import './Header.css';
import { Layout, Menu, Breadcrumb, Typography, Row, Col, Icon  } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;


class Header extends React.Component {

    state= {
        currentPage:"home",
    }

    _handleNavbarClick = (e) => {
        this.setState({ currentPage: e.key })
    }
    render() {
        return (
            <Layout.Header>
                <Row type="flex" style={{ height: '100%'}} align="bottom" justify="space-between">
                    <Col span={4}><Title level={2}>Resonance</Title></Col>
                    <Col>
                        <Menu mode="horizontal" selectedKeys={[this.state.currentPage]} onClick={this._handleNavbarClick}>
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home" />
                                    Home
                                </Link>
                               
                            </Menu.Item>
                            <Menu.Item key="sign-up">
                                <Link to="/signUP">
                                    <Icon type="mail" />
                                    Sign Up
                                </Link>
                               
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                
                
            </Layout.Header>
        );
    }
}

export default Header;