import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Shop1Sales from './Shop1Sales';
import Shop1Inventory from './Shop1Inventory';
import Shop1Accounts from "./Shop1Accounts";

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
    },
}));

export default function Shop1Home(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    //const Navigation= props.history;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    indicator={{ backgroundColor: "#000" }}
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab
                        className={value === 0 ? classes.activetab : null}
                        label="Sales"
                    />
                    <LinkTab
                        className={value === 1 ? classes.activetab : null}
                        label="Inventory"
                    />
                    <LinkTab
                        className={value === 2 ? classes.activetab : null}
                        label="Accounts"
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Shop1Sales />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Shop1Inventory />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Shop1Accounts />
            </TabPanel>
        </div>
    );
}
