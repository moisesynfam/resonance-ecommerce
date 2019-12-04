import React from 'react';
import { Row, Col, Layout, Typography, Breadcrumb, Skeleton, Divider, Descriptions  } from 'antd' 
import { connect } from 'react-redux';
import _ from 'lodash';

const { Title, Paragraph, Text } = Typography;

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const PriceTag = ({price, size}) => {

    return (
       
        <Text strong type="danger" style={{fontSize: size}}>{ currencyFormatter.format(price) }</Text>
        
    )
}


export default PriceTag