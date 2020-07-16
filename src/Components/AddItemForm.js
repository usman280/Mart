import React, { useRef } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, withStyles } from '@material-ui/core'
import ReactToPrint from "react-to-print";
import BarCodeGenerator from './BarCodeGenerator';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#e61f27',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#000',
            },
        },
    },
})(TextField);

const AddItemForm = ({ onAfterPrint, open, onClose, itemId, itemname, price, quantity, onCancelClick, onAddItemClick, idHandler, nameHandler, priceHandler, quantityHandler }) => {

    const componentRef = useRef();


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
            <DialogContent style={{ marginBottom: 20 }}>
                <CssTextField
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
                <CssTextField
                    label="Item Name"
                    margin='normal'
                    id="itemname"
                    variant='outlined'
                    type="text"
                    value={itemname}
                    autoCapitalize="true"
                    autoComplete="off"
                    placeholder="itemname"
                    fullWidth
                    onChange={nameHandler}
                    required
                />
                <CssTextField
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
                <CssTextField
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
                <BarCodeGenerator ref={componentRef} value={itemId} />
                <Button
                    style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
                    variant="contained"
                    onClick={onCancelClick}
                >
                    Cancel
                </Button>
                <ReactToPrint
                    onBeforeGetContent={onAddItemClick}
                    trigger={() => <Button
                        variant="contained"
                        onClick={onAddItemClick}
                        style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
                    >
                        Add Item
                    </Button>}
                    content={() => componentRef.current}
                />

            </DialogActions>
        </Dialog>
    )
}

export default AddItemForm;