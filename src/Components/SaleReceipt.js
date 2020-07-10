import React from 'react';


const SaleReceipt = ({ receipt }) => receipt.map(
    function (item, index) {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }} key={index}>
                <p>{item.itemid}</p>
                <p>{item.itemname}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
            </div>
        )
    }
)

export default SaleReceipt;