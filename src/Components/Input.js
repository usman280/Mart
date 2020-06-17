import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({label,id,onChange,disabled,type}) => {
    return (
        <div style={{ margin: '20px 0px' }}>
            <TextField label={label} type={type} id={id} onChange={onChange} disabled={disabled} variant="outlined" fullWidth={true} required={true} />
        </div>
    )
}

export default Input;