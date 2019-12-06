import React from 'react';
import {  Typography } from 'antd' 

const { Text } = Typography;

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