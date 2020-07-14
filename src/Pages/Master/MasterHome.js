import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Button } from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Sales from "../Sales";
import Shops from "./Shops";
import Accounts from "./Accounts";
import MainInventory from "./MainInventory";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { BorderStyle } from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function LinkTab(props) {
  const { className } = props;

  return (
    <Tab
      textColor="primary"
      className={className}
      style={{ textDecorationColor: "black" }}
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  activetab: {
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
}));

export default function MasterHome(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  //const Navigation= props.history;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems: "center",
      }}>

        <span style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <img src={require('./hamza.jpg')} height="110" width="130" style={{ borderRadius: '50%' ,borderWidth: 1, borderStyle:'solid'}} />
          <p style={{fontSize: 20, fontWeight: 550,}}>Hamza Khan</p>
        </span>

        <img src={require('./logo.png')} style={{ height: 150, width: 300 }} />

        <Button
          style={{ backgroundColor: '#e61f27', color: '#fff', opacity: 0.9, letterSpacing: 1, }}
          onClick={() => {
            console.log("Logout Clicked")
          }}
          variant="contained"
          startIcon={<ExitToApp />}
        >Logout
        </Button>
      </div>
      <AppBar position="static" color="transparent" style={{marginTop: 20}}>
        <Tabs
          variant="fullWidth"
          indicatorColor="black"
          indicator={{ backgroundColor: "#000" }}
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            className={value === 0 ? classes.activetab : null}
            label="Main Inventory"
            onClick={() => console.log("MainInventory")}
          />
          <LinkTab
            className={value === 1 ? classes.activetab : null}
            label="Shops"
          />
          <LinkTab
            className={value === 2 ? classes.activetab : null}
            label="Sales"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MainInventory />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Shops props={props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Accounts />
      </TabPanel>
    </div>
  );
}
