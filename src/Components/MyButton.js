import React from 'react';
import { Button } from '@material-ui/core';

const MyButton = ({ ButtonText, onClick, disabled }) => {
    return (
        <div style={{ margin: "0px 30px" }}>
            <Button variant="contained" color='primary' onClick={onClick} size='large' disabled={disabled} disableElevation={true} fullWidth={true} >
                {ButtonText}
            </Button>
        </div>
    )
}

export default MyButton;