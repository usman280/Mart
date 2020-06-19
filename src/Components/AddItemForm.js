import React from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'



const AddItemForm = ({ open, onClose, itemId, itemname, price, quantity, onCancelClick, onAddItemClick, idHandler, nameHandler, priceHandler, quantityHandler }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
            <DialogContent style={{ marginBottom: 20 }}>
                <TextField
                    autoFocus
                    margin='normal'
                    id="itemid"
                    variant='outlined'
                    value={itemId}
                    label="Item Id"
                    type="number"
                    fullWidth
                    autoComplete="off"
                    onChange={idHandler}
                />
                <TextField
                    label="Item Name"
                    margin='normal'
                    id="itemname"
                    variant='outlined'
                    type="text"
                    value={itemname}
                    autoCapitalize
                    autoComplete={false}
                    placeholder="itemname"
                    fullWidth
                    onChange={nameHandler}
                    required
                />
                <TextField
                    margin='normal'
                    id="price"
                    variant='outlined'
                    value={price}
                    label="Price"
                    type="number"
                    fullWidth
                    autoComplete="off"
                    onChange={priceHandler}
                />
                <TextField
                    margin='normal'
                    id="quantity"
                    variant='outlined'
                    value={quantity}
                    label="Quantity"
                    type="number"
                    fullWidth
                    autoComplete="off"
                    onChange={quantityHandler}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onCancelClick}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onAddItemClick}
                    color="primary"
                >
                    Add Item
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddItemForm;