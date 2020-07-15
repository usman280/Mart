import React from 'react';
import { Dialog, DialogTitle, withStyles, DialogActions, DialogContent, FormControl, FormControlLabel, Checkbox, Button, Typography, TextField, makeStyles } from '@material-ui/core';


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

const DistributionForm = ({ open, shop1check, shop2check, shop3check, shop4check, checkBoxHandler, onClose, onCancelClick, error, onDistributeClick, itemId, idHandler, quantity, quantityHandler }) => {


    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
            <DialogContent style={{ marginBottom: 20 }}>
                <CssTextField
                    variant='outlined'

                    autoFocus
                    margin="normal"
                    id="itemid"
                    value={itemId}
                    label="Item Id"
                    type="number"
                    fullWidth
                    autoComplete="off"
                    autoFocus={true}
                    onChange={idHandler}
                />
                <FormControl className={classes.checkBoxesContainer}>
                    <FormControlLabel className={classes.checkBoxStyle}
                        control={
                            <Checkbox
                                checked={shop1check}
                                onChange={checkBoxHandler}
                                name="shop1"
                                color="primary"
                            />
                        }
                        label="Shop 1"
                    />
                    <FormControlLabel className={classes.checkBoxStyle}
                        control={
                            <Checkbox
                                checked={shop2check}
                                onChange={checkBoxHandler}
                                name="shop2"
                                color="primary"
                            />
                        }
                        label="Shop 2"
                    />
                    <FormControlLabel className={classes.checkBoxStyle}
                        control={
                            <Checkbox
                                checked={shop3check}
                                onChange={checkBoxHandler}
                                name="shop3"
                                color="primary"
                            />
                        }
                        label="Shop 3"
                    />
                    <FormControlLabel className={classes.checkBoxStyle}
                        control={
                            <Checkbox
                                checked={shop4check}
                                onChange={checkBoxHandler}
                                name="shop4"
                                color="primary"
                            />
                        }
                        label="Shop 4"
                    />
                </FormControl>
                <CssTextField
                    variant='outlined'
                    margin="normal"
                    id="quantity"
                    value={quantity}
                    type="number"
                    placeholder="Quantity"
                    fullWidth
                    onChange={quantityHandler}
                    required
                />
                {error ? <Typography className={classes.errorStyle} variant="h6" >Item Not Found</Typography> : null}
            </DialogContent>
            <DialogActions>
                <Button
                    style={{ alignSelf: 'flex-start', backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
                    variant="contained"
                    onClick={onCancelClick}
                    color="primary"
                >
                    Cancel
      </Button>
                <Button
                    variant="contained"
                    onClick={onDistributeClick}
                    style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1 }}
                >
                    Distribute
      </Button>
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles({
    errorStyle: {
        color: 'Red',
        textAlign: 'center',
        padding: 10
    },
    checkBoxStyle: {
        margin: 10
    },
    checkBoxesContainer: {
        margin: 0
    }
});


export default DistributionForm;