import React from "react";
import PropTypes from "prop-types";
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import Shops from "./Shops";
import Accounts from "./Accounts";
import MainInventory from "./MainInventory";
import Header from '../../Components/Header';

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

      <Header username="Hamza Khan" imageSource={require('./hamza.jpg')} />
      <AppBar position="static" color="transparent" style={{ marginTop: 20 }}>
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
        <Accounts props={props} />
      </TabPanel>
    </div>
  );
}
