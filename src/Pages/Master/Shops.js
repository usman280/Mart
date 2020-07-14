import React from 'react';
import { makeStyles, Grid, Card, CardContent } from '@material-ui/core';
import { Navigation } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardStyle: {
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: 'solid',
    },
    cardContentStyle: {
        textAlign: 'center',
    },
    maingridView: {
        marginTop: 50,
    },
    subgridView: {
        marginTop: 30,
    }
}));


export default function Shops({ props }) {
    const classes = useStyles();

    const Navigation = props.history;
    return (
        <div className={classes.root}>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'items', justifyContent: 'space-around', marginTop: 70 }}>

            <span style={{ borderWidth: 1.5, borderStyle: 'solid', width: '30%', padding: 25, borderRadius: 20, backgroundColor:'#e61f27', opacity: 0.9  }} onClick={()=>Navigation.push('./Shop1Inventory')}>
                    <p style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', color:'#fff',letterSpacing: 1 }}>Shop 1</p>
                </span>

                <span style={{ borderWidth: 1.5, borderStyle: 'solid', width: '30%', padding: 25, borderRadius: 20, backgroundColor:'#e61f27', opacity: 0.9  }} onClick={()=>Navigation.push('./Shop2Inventory')}>
                    <p style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', color:'#fff',letterSpacing: 1 }}>Shop 2</p>
                </span>

            </div>



            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'items', justifyContent: 'space-around', marginTop: 70 }}>

                <span style={{ borderWidth: 1.5, borderStyle: 'solid', width: '30%', padding: 25, borderRadius: 20, backgroundColor:'#e61f27', opacity: 0.9 }} onClick={()=>Navigation.push('./Shop3Inventory')}>
                    <p style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', color:'#fff',letterSpacing: 1 }}>Shop 3</p>
                </span>

                <span style={{ borderWidth: 1.5, borderStyle: 'solid', width: '30%', padding: 25, borderRadius: 20, backgroundColor:'#e61f27', opacity: 0.9 }} onClick={()=>Navigation.push('./Shop4Inventory')}>
                    <p style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', color:'#fff',letterSpacing: 1 }}>Shop 4</p>
                </span>

            </div>
        </div>
    );
}