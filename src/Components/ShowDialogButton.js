import React from 'react';
import { Button } from '@material-ui/core';
import AddCircle from "@material-ui/icons/AddCircle";

const ShowDialogButton = ({ onClick }) => {
    return (
        <Button
            style={{ marginBottom: 10 }}
            onClick={onClick}
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
        >
            Add New Item
        </Button>
    )
}

export default ShowDialogButton;