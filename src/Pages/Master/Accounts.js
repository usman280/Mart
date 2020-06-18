import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

export default function Accounts() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.maingridView} container spacing={3}>
                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop A</h1>
                            <p>Sales</p>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop A</h1>
                            <p>Sales</p>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop A</h1>
                            <p>Sales</p>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid  className={classes.subgridView} item xs={6}>
                    <Card className={classes.cardStyle} variant='elevation'>
                        <CardContent className={classes.cardContentStyle}>
                            <h1>Shop A</h1>
                            <p>Sales</p>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}