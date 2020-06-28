import React, { useState } from 'react';
import QRCode from 'react-qr-code';

// export default class QRCodeGenerator extends React.Component {

//     render() {
//         return (
//             <div >
//                 <QRCode
//                     value="1"
//                 />
//             </div>
//         )
//     }
// }

const QRCodeGenerator = React.forwardRef(( {value}, ref ) => {
    return (
        <div ref={ref} style={{display:'flex', flexDirection:'column', flex:1, justifyContent:'flex-start', alignItems:'center'}}>
            <QRCode
                value={value}
                size={128}
            />
            <p style={{textAlign:'center', fontWeight:'bold', color:'red'}}>{value}</p>
        </div>
    )
});

export default QRCodeGenerator;