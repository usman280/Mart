import React from 'react';
import QRCode from 'react-qr-code';

export default class QRCodeGenerator extends React.Component {
    render(){
        return(
            <QRCode
            value="1"
            />
        )
    }
}
