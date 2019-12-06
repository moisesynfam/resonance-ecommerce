import React from 'react';
import { Form, Input, Button, Row, Col, Icon, Card, Typography, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../redux/actions/auth';

class Login extends React.Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");   
        }
    }
    _onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll( async (err, values) => {
            if(!err) {
                // console.log("Login form values", values);
                const results = await this.props.loginUser(values, this.props.history);

                if(!results.success) {
                    message.error(results.message);
                } else {
                    this.props.history.push('/catalog')
                }
            }

        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return(
            <div className="page-container" style={{ display: 'flex', flex: 1, flexDirection:"column",}}>
                <Row type="flex"  style={{flex: 1}}>
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <Card bodyStyle={{ flex: 1}}  style={{ height: '100%', display: 'flex', alignItems: 'center'}} >
                            <Row type="flex" justify="center">
                                <Col span={24}><Typography.Title level={3} style={{ textAlign: 'center'}}>Log In</Typography.Title></Col>
                                <Col xs={22} sm={22} md={18}>
                                    <Form onSubmit={this._onSubmit}>
                                        <Form.Item >
                                            {getFieldDecorator('username', {
                                                rules: [
                                                    { required: true, message: 'A username is required.'}
                                                ]
                                            })(
                                            <Input 
                                                placeholder="Username" 
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            />
                                            )}
                                        </Form.Item>

                                        <Form.Item >
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    { required: true, message: 'A password is required.'}
                                                ]
                                            })(
                                            <Input
                                                type="password"
                                                placeholder="Password" 
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            />
                                            )}
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
                                                Log in
                                            </Button>
                                            <Divider>Or</Divider>

                                            <Link to="/signUp">Sign up now!</Link>
                                        </Form.Item>
                                    </Form>

                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={0} sm={0} md={12} lg={16} >
                        <div style={{ height: '100%', display: 'flex', flexDirection:"column"}}>
                            <img 
                                style={{ objectFit: 'cover', flex: 1}}
                                alt="showcase"
                                src="https://cdn.shopify.com/s/files/1/1890/8745/files/retro_style_wooden_furniture_range_1400x.progressive.jpg?v=1553786123"
                            />
                        </div>
                       
                        
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

const formCapsule = Form.create({ name: 'login'})(Login);
export default connect(mapStateToProps, { loginUser })( withRouter(formCapsule));