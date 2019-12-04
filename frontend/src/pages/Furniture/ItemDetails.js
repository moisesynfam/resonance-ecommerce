import React from 'react';
import { Row, Col, Layout, Typography, Breadcrumb, Skeleton, Divider, Descriptions, Button  } from 'antd' 
import { connect } from 'react-redux';
import { fetchCurrentItem } from '../../redux/actions/furniture';
import { Link } from 'react-router-dom';
import item from '../../components/item';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import ItemDetailHeader from '../../components/ItemDetailHeader';
import PriceTag from '../../components/PriceTag';
import _ from 'lodash';


const { Title, Paragraph, Text } = Typography;

class ItemDetails extends React.Component {

    state = {
        isLoading: false,
    }
    componentDidMount() {
        this._getItem();
    }

    _getItem = async () => {
        const { id } = this.props.match.params;
        console.log(this.props)
        this.setState({ isLoading: true})
        const result = await this.props.fetchCurrentItem(id);
        this.setState({ isLoading: false });
        // do something if error
    }

    _formatPicturesArray = (pictures) => {
        // const { fields: { Name, Description, Picture } } = item;
        // pictures = Picture;
        return pictures.map( (picture) => ({
            original: picture.url,
            thumbnail: picture.thumbnails.large.url
        }))
    }
    _renderVendorInfo = () => {
        const { vendor } = this.props;
        
        if(!vendor) return;
        const descriptions = [];
        if(vendor.fields['Name']) descriptions.push(  <Descriptions.Item key="vendor-name" label="Name">{vendor.fields['Name']}</Descriptions.Item>  );
        if(vendor.fields['Catalog Link']) {
            descriptions.push(  
                <Descriptions.Item key="vendor-link" label="Catalog Link">
                    <a href={vendor.fields['Catalog Link']}>{vendor.fields['Catalog Link']}</a>
                </Descriptions.Item>  
            );
        }    
        if(vendor.fields['Vendor Phone Number']) {
            descriptions.push(  
                <Descriptions.Item label="Phone" key="vendor-phone">
                    {vendor.fields['Vendor Phone Number']}
                </Descriptions.Item>  
            );
        }

        return (
            <Descriptions bordered layout='vertical'>
               { descriptions.map( item => item) }
            </Descriptions>
        )
    }

    _renderMainContent = () => {
        if( this.state.isLoading || !this.props.currentItem.fields) {
            return (
                <Row type="flex" align="top" justify="center" >
                    <Col span={24}>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </Col>
                     
                </Row>
               
            );
        }

        const { fields,  fields: { Name, Description, Picture, Type } } = this.props.currentItem;
        // const { fields,  fields: { Name, Description, Picture, Type } } = item;
        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/catalog">Catalog</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{Name}</Breadcrumb.Item>
                </Breadcrumb>
                <br/>
                <ItemDetailHeader
                    name={Name}
                    vendor={this.props.vendor}
                />
                
                <Divider/>
                <Row gutter={[24, 16]}>
                    <Col xs={24}>
                    <Button type="primary" shape="round" icon="mail"  > Send to your email</Button>
                    </Col>
                    <Col xs={24} sm={24} md={9}>
                        
                        <Descriptions title="" column={1}>
                            <Descriptions.Item label="Price" span={1}><PriceTag price={fields['Unit Cost']}/></Descriptions.Item>
                            <Descriptions.Item label="In Stock" span={1}>{fields['Units In Store']}</Descriptions.Item>
                            <Descriptions.Item label="Type" span={1}>{ Type }</Descriptions.Item>
                            <Descriptions.Item label="Materials and Finishes" span={1}>Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="Settings" span={1}>empty</Descriptions.Item>
                            <Descriptions.Item label="Dimensions" span={1}> { fields["Size (WxLxH)"]}  </Descriptions.Item>
                            <Descriptions.Item label="Item Link" span={1}> <a href={fields['Link']} target="_blank">{fields['Link']}</a>  </Descriptions.Item>
                        </Descriptions>
                        
                    </Col>
                    <Col xs={24} sm={24} md={15} >
                        
                            <ImageGallery 
                                
                                items={this._formatPicturesArray(Picture)}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                thumbnailPosition="right"
                                renderItem={ (item) => (
                                    <img src={item.original} style={{maxHeight: 500, objectFit: 'scale-down'}}/>
                                )}
                            />
                       
                       
                    </Col>
                    
                    <Col xs={24}>
                        <Divider/>
                        <Title level={4}>Item Description</Title>
                        <Paragraph style={{ fontSize: 16}} type="secondary" >{Description}</Paragraph>
                    </Col>
                    <Col xs={24}>
                        <Divider/>
                        <Title level={4}>Vendor Information</Title>
                        { this._renderVendorInfo() }
                    </Col>
                </Row>
            </>

        )
    }

    _renderLoadingScreen = () => {
        
    }

    render() {
        return (
            <Row type="flex" justify="center"  style={{flex: 1}}>
                <Col xs={24} sm={22} md={18} style={{ display: 'flex'}}>
                    <Layout className="Catalog-page">
                        <Layout.Content style={{background: 'white', padding: '30px 20px'}}>
                            
                            { this._renderMainContent() }
                            
                            
                        </Layout.Content>
                    </Layout>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {

    const { vendors: { list }, furniture: {currentItem} } = state;
    let vendor = null;
    
    if(currentItem.fields){
        const vendorId = _.first(currentItem.fields.Vendor);
        vendor = _.find( list, ( vendor => vendor.id === vendorId));
    }
    
    return {
        vendor: vendor,
        currentItem
    }
}

export default connect(mapStateToProps, {fetchCurrentItem})(ItemDetails)