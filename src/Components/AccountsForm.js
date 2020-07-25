import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withStyles,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e61f27",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  },
})(TextField);

const AccountsForm = ({
  handleChangeSelect,
  handleExpense,
  open,
  person,
  onClose,
  onCancelClick,
  onAddExpenseClick,
  expensetype,
  handleChangeSelecttype,
  expense,
}) => {
  const componentRef = useRef();
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
      <DialogContent style={{ marginBottom: 20 }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">To</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={expensetype}
            onChange={handleChangeSelecttype}
          >
            <MenuItem value={"Company"}>Company</MenuItem>
            <MenuItem value={"Manager"}>Manager</MenuItem>
            <MenuItem value={"Expense"}>Expense</MenuItem>
          </Select>
          <FormHelperText>WithDrawl Category</FormHelperText>
        </FormControl>
        {expensetype === "Company" ? (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={person}
              onChange={handleChangeSelect}
            >
              <MenuItem value={"Talha"}>Talha</MenuItem>
              <MenuItem value={"Hamza"}>Hamza</MenuItem>
              <MenuItem value={"Masood"}>Masood</MenuItem>
            </Select>
            <FormHelperText>WithDrawl by</FormHelperText>
          </FormControl>
        ) : null}
        <CssTextField
          autoFocus
          margin="normal"
          id="expenseid"
          variant="outlined"
          value={expense}
          label="Expense"
          type="number"
          fullWidth
          autoComplete="off"
          onChange={handleExpense}
        />
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            backgroundColor: "#e61f27",
            color: "#fff",
            opacity: 0.9,
            letterSpacing: 1,
          }}
          variant="contained"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onAddExpenseClick}
          style={{
            backgroundColor: "#e61f27",
            color: "#fff",
            opacity: 0.9,
            letterSpacing: 1,
          }}
        >
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountsForm;
