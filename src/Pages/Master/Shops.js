import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";

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

export default function Shops() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.maingridView} container spacing={3}>

                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation' >
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop A</h1>
                            <p>Shop Number 1</p>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop B</h1>
                            <p>Shop Number 2</p>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop C</h1>
                            <p>Shop Number 3</p>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop D</h1>
                            <p>Shop Number 4</p>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}