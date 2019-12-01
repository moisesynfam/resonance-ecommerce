import React from 'react';
import { Form, Input, Button, Row, Col, Icon, Card, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    _onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll( (err, values) => {
            if(!err) {
                console.log("Login form values", values);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return(
            <div className="page-container">
                <Row>
                    <Col xs={24} sm={12} md={8}>
                        <Card>
                            <Row type="flex" justify="center">
                                <Typography.Title level={3}>Log In</Typography.Title>
                            </Row>
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

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create({ name: 'login'})(Login);