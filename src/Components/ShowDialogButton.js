import React from 'react';
import { Button } from '@material-ui/core';
import AddCircle from "@material-ui/icons/AddCircle";

const ShowDialogButton = ({ onClick, DialogText }) => {
    return (
        <Button
            style={{ marginBottom: 10, backgroundColor:'#e61f27', color:'#fff', opacity: 0.9, letterSpacing: 1 }}
            onClick={onClick}
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
        >
            {DialogText}
        </Button>
    )
}

export default ShowDialogButton;