import React from 'react';
import './Home.css';
import FurnitureItem from '../components/FurnitureItem'
import { Row, Col, Layout, Typography } from 'antd' 
import { connect } from 'react-redux';
import { fetchFurniture } from '../redux/actions/furniture';

const { Title } = Typography;
class Home extends React.Component {

    render() {
        return (
           
            <Row type="flex" justify="center" style={{flex: 1}}>
                <Col xs={24} sm={22} md={18}>
                    Home
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