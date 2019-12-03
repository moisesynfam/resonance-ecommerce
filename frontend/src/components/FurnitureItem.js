import React from 'react';
import item from './item';
import { Card, Typography, Tag } from 'antd';

const { Text } = Typography;
class FurnitureItem extends React.Component {


    _getImageStragedy = (dimensions) => {

        if(dimensions.height > dimensions.width) return 'scale-down';
        if(dimensions.height < dimensions.width) return 'contain';
        if(dimensions.height = dimensions.width) return 'scale-down';

    }
    render() {

        const { item } = this.props;
        // console.log({item})
        const coverImage = item.fields.Picture[0].thumbnails.large;
        const dimensions = { height: coverImage.height, width: coverImage.width};
        const title = item.fields.Name;
        return (
            <Card
                style={{width: '100%'}}
                hoverable
                
                cover={<img alt={item.fields.Name} src={coverImage.url} style={{ height: 200, objectFit: this._getImageStragedy(dimensions)}}/>}
            >   <Card.Meta title={title}/>
                <br/>
                <Text>
                    ${item.fields["Unit Cost"]}
                    <br/>
                </Text>
                <Tag>{ item.fields["Units In Store"] > 0 ? "Avaliable" : "Out of stock"}</Tag>
            </Card>
        )
        

    }
}
FurnitureItem.defaultProps = {
    item: item
}
export default FurnitureItem;