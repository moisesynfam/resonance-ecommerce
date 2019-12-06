import React from 'react';
import { 
    Form,
    Input,
    Row,
    Col,
    Button,
    Typography,
    Card
} from "antd";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../redux/actions/auth';

const { Title } = Typography;


class SignUp extends React.Component {

    state = {
        errors: {},
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/");
        }
    }

    _onSubmit = (e) => {
        e.preventDefault();
        this.setState({ errors: {}});
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const results = await this.props.registerUser(values);
                console.log({results});
                if(!results.success){
                    this.setState({ errors: results.errors}, () => {
                        this.props.form.validateFields(['email', 'username'], { force: true})
                    });
                } else {
                    this.props.history.push('/login')
                }


            }
        });
    }
    _onEmailChange = e => {
        if(!this.state.errors.email) return;
        const errors = {...this.state.errors};
        delete errors.email;
        this.setState({errors});

    }

    _onUsernameChange = e => {
        if(!this.state.errors.username) return;
        const errors = {...this.state.errors};
        delete errors.username;
        this.setState({errors});

    }

    _validateUniqueFields = (rule, value, callback) => {
        if(rule.field === 'email' && this.state.errors.email) {
            callback(this.state.errors.email);
        } else if ( rule.field === 'username' && this.state.errors.username){
            callback(this.state.errors.username)
        } else {
            callback()
        }
    }
    _validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.password2Dirty) {
            form.validateFields(['password2'], { force: true });
        }
        callback();
    }

    _compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Inconsistent passwords.');
        } else {
            callback();
        }
    }

    _handlePassword2Blur = (e) => {
        const { value } = e.target;
        this.setState({ password2Dirty: this.state.password2Dirty || !!value });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="page-container" style={{ 
                background: '#ffccbc', 
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Row type="flex" align="middle" justify="center">
                        <Col xs={22} sm={22} md={16} lg={16} xl={12}>
                            <Card style={{ boxShadow: '0 7px 20px #0c0c0c59'}}>
                                <Row type="flex" justify="center">
                                    <Col span={24} >
                                        <Row type="flex" justify="center">
                                            <Title>Sign Up</Title>
                                        </Row>
                                    
                                    </Col>
                                    <Col xs={22} sm={22} md={20} lg={16} xl={14}>
                                        
                                        <Form onSubmit={this._onSubmit} layout="vertical">
                                            <Form.Item label='Name'>
                                                {getFieldDecorator('firstName',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your name!',
                                                        }
                                                    ]
                                                })(<Input/>)}
                                            </Form.Item>

                                            <Form.Item label='Last Name'>
                                                {getFieldDecorator('lastName',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your last name!',
                                                        }
                                                    ]
                                                })(<Input/>)}
                                            </Form.Item>

                                            <Form.Item label='Username'>
                                                {getFieldDecorator('username',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your username!',
                                                        },
                                                        {
                                                            validator: this._validateUniqueFields
                                                        }
                                                    ]
                                                })(<Input onChange={this._onUsernameChange}/>)}
                                            </Form.Item>

                                            <Form.Item label='E-mail'>
                                                {getFieldDecorator('email',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your last email!',
                                                        },
                                                        {
                                                            type: 'email',
                                                            message: 'Invalid e-mail format.'
                                                        },
                                                        {
                                                            validator: this._validateUniqueFields
                                                        }
                                                    ]
                                                })(<Input onChange={this._onEmailChange}/>)}
                                            </Form.Item>
                                            <Form.Item label='Password'>
                                                {getFieldDecorator('password',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        {
                                                            validator: this._validateToNextPassword
                                                        }
                                                    ]
                                                })(<Input.Password/>)}
                                            </Form.Item>

                                            <Form.Item label='Confirm password'>
                                                {getFieldDecorator('password2',{
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        {
                                                            validator: this._compareToFirstPassword
                                                        }
                                                    ]
                                                })(<Input.Password onBlur={this._handlePassword2Blur}/>)}
                                            </Form.Item>
                                            <Form.Item >
                                                <Button htmlType="submit">Register</Button>
                                            </Form.Item>
                                        </Form>
                                        
                                    </Col>
                                </Row>

                            </Card>

                        </Col>
                    </Row>
            </div>
        )
    }

}

const mapStateToProps = state => {

    return {
        auth: state.auth
    }
}
const formCapsule = Form.create({name: 'register'})(SignUp);
const withRouterCapsule = withRouter(formCapsule);

export default connect( mapStateToProps, { registerUser })(withRouterCapsule);