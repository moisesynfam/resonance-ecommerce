import React from 'react';
import { Button, notification, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ResonanceApi from '../apis/Resonance';

const NOTIFICATION_KEY = 'EMAIL_NOTIFICATION'
const onButtonClick = async (itemId, itemName, isAuthenticated, history) => {
    if(!isAuthenticated) {
        history.push('/login');
        return;
    }
    notification.open({
        key: itemId+"-"+NOTIFICATION_KEY,
        message: 'Sending Item: ' + itemName,
        description: 'We\'re sending this item\'s information to your inbox.',
        icon: <Icon theme="twoTone" type="info-circle" twoToneColor="#29b6f6"/>
        
    })
    const results = await ResonanceApi.furniture.emailItem(itemId);
    if(results.success) {
        notification.open({
            key: itemId+"-"+NOTIFICATION_KEY,
            message: 'Item Sent: ' + itemName,
            description: 'The information was sent successfully. Check your inbox!',
            icon: <Icon theme="twoTone" type="check-circle" twoToneColor="#66bb6a"/>
        });
        return;
    }
 
    notification.open({
        key: itemId+"-"+NOTIFICATION_KEY,
        message: 'Error Sending Item: ' + itemName,
        description: results.message,
        icon: <Icon theme="twoTone" type="check-close" twoToneColor="#ff1744" />
    })
    
}
const EmailItemButton = ({ itemId, isAuthenticated, itemName, history }) => {
   
    return (
        <Button type="primary" shape="round" icon="mail" onClick={ () => onButtonClick(itemId, itemName, isAuthenticated, history)}> Send to your email</Button>
    )
}

const mapStateToProps = (state, props) => {
    
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default  connect(mapStateToProps)(withRouter(EmailItemButton));