import React from 'react';
import { Typography } from 'antd' 


const { Title } = Typography;
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
            <a href={vendorLink} target="_blank" rel="noopener noreferrer"><img src={vendorLogo.url} style={{ maxHeight: '50px'}}/></a>
            <Title>{ vendorName } {name}</Title>
        </div>
    )
}



export default (ItemDetailHeader)