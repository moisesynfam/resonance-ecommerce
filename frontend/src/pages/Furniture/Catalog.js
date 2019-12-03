import React from 'react';
import FurnitureItem from '../../components/FurnitureItem'
import { Row, Col, Layout, Typography, Breadcrumb } from 'antd' 
import { connect } from 'react-redux';
import { fetchFurniture } from '../../redux/actions/furniture';
import { Link } from 'react-router-dom';

const { Title } = Typography;
class Catalog extends React.Component {

    componentDidMount() {
        this.props.fetchFurniture();
    }

    _renderItem = (item, index) => {

        if(!item.fields.Picture) return null;

        return (
            <Col xs={24}  md={12} lg={8} style={{justifyContent: 'center'}} key={item.id}>
                                        
                <Row type="flex" align="middle" justify="center">
                    <FurnitureItem item={item}/>
                </Row>
            </Col>
        )
    }
    render() {
        return (
           
            <Row type="flex" justify="center" style={{flex: 1}}>
                <Col xs={24} sm={22} md={18}>
                <Layout className="Catalog-page">
                    <Layout.Sider 
                        breakpoint="md"
                        collapsedWidth="0"
                        style={{ backgroundColor: 'white'}}
                        theme='light'
                    >

                    </Layout.Sider>
                    <Layout.Content style={{background: 'white', padding: '30px 20px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>Catalog</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row gutter={[10, 16]}>
                            <Col span={24}>
                                <Title>Our Catalog</Title>
                            </Col>
                            { this.props.items.map( (item, index) => ( this._renderItem(item, index) ))}
                        </Row>
                        
                    </Layout.Content>
                </Layout>
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


export default connect(mapStateToProps, {fetchFurniture })(Catalog);