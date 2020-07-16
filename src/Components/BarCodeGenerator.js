import React, { Component, forwardRef } from 'react'
import Barcode from 'react-barcode';
 

const BarCodeGenerator = forwardRef( ({value}, ref) => {
  return(
    <div ref={ref} style={{display:'flex', flexDirection:'column', flex:1, justifyContent:'flex-start', alignItems:'center'}}>
      <Barcode value={value} />
    </div>
  )
});

export default BarCodeGenerator;