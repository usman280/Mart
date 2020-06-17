import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';


const Loader = () => {
    return (
        <Grid container direction='row' justify='center' alignItems='center' style={{ margin: '80px 0px' }}>
            <CircularProgress color='primary' />
        </Grid>
    )
}

export default Loader;
