import React from 'react';
import { Row, Col, Layout, Typography, Breadcrumb, Skeleton, Divider, Descriptions  } from 'antd' 
import { connect } from 'react-redux';
import _ from 'lodash';

const { Title, Paragraph, Text } = Typography;
const ItemDetailHeader = ({vendor, name, style, className}) => {
    let vendorLogo = {};
    let vendorName;
    let vendorLink;
    if(vendor) {
        vendorLogo = vendor.fields.Logo[0].thumbnails.large;
        vendorName = vendor.fields.Name + '\'s ';
        vendorLink = vendor.fields['Catalog Link'];
    }
    return (
        <div style={style} className={"" + className}>
            <a href={vendorLink} target="_blank"><img src={vendorLogo.url} style={{ maxHeight: '50px'}}/></a>
            <Title>{ vendorName } {name}</Title>
        </div>
    )
}



export default (ItemDetailHeader)