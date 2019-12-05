import React from 'react';
import './Home.css';
import { Row, Col,  Typography, Button } from 'antd' 
import { connect } from 'react-redux';
import { fetchFurniture } from '../redux/actions/furniture';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;
class Home extends React.Component {

    render() {
        return (
           
            <Row type="flex" justify="center" className="home-page" style={{flex: 1}}>
                <Col xs={24} sm={22} md={18} style={{ display: 'flex'}}>
                    <Row type="flex"  justify="center" align="middle" style={{flex: 1}}>
                        <Col xs={22} sm={20} md={18} lg={12}>
                            
                            <Title className="text-white">Welcome to RESONANCE</Title>
                            <Paragraph  className="text-white" style={{ fontSize: 25}}>
                                Changing the way appliances brands work.
                            </Paragraph>
                            <Link to='/catalog'><Button ghost  size="large">VIEW CATALOG</Button></Link>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>           
        );
    }

}

const mapStateToProps = state => {
    return { 
        items: state.furniture.items
    }
}


export default connect(mapStateToProps, {fetchFurniture })(Home);