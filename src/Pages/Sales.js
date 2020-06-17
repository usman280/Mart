import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database } from "../config";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Sales() {

  
  const [open, setOpen] = useState(false);
  const [itemname, setItemName] = useState('');
  const [itemId, setItemId] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const classes = useStyles();

  function addItem() {
    
    //const {itemId,itemname,category,quantity} = props;

    setOpen(false);
    
    // const prevquan = parseInt(this.state.previousquantity);
    // const quan = parseInt(this.state.quantity);

    const details = {
      itemid: itemId,
      itemname: itemname,
      category: category,
      quantity: quantity,
    };

    database
      .ref("Inventory")
      .child(itemId)
      .update(details)
      .then((res) => {
        setItemId('');
        setItemName('');
        setCategory('');
        setQuantity('');
        console.log("Success",res);
      }).
      catch( err => console.log("FAiled",err))
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 50,
      }}
    >
      <Button
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
      >
        Add New Item
          </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Item Details</DialogTitle>
        <DialogContent style={{ marginBottom: 20 }}>
          <TextField
            autoFocus
            margin="dense"
            id="itemid"
            value={itemId}
            label="Item Id"
            type="number"
            fullWidth
            autoComplete="off"
            onChange={(e) => setItemId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="itemname"
            type="text"
            value={itemname}
            autoFocus={true}
            autoComplete="on"
            placeholder="itemname"
            fullWidth
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            value={category}
            type="text"
            fullWidth
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            value={quantity}
            type="number"
            placeholder="Quantity"
            fullWidth
            onChange={(e)=> setQuantity(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="primary"
          >
            Cancel
              </Button>
          <Button
            variant="contained"
            onClick={()=> addItem()}
            color="primary"
          >
            Add Item
              </Button>
        </DialogActions>
      </Dialog>
      <Table size="large" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Item Id</StyledTableCell>
            <StyledTableCell align="center">Item Name</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">
              Recent Added Quantity
                </StyledTableCell>
            <StyledTableCell align="center">Total Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} style={{}}>
              <TableCell align='center'>{row.name}</TableCell>
              <TableCell align='center'>{row.calories}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.fat}</TableCell>
              <TableCell align='center'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}