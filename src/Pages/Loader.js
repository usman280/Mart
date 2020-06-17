import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  return (
    <div>
        <CircularProgress variant='static'  color="primary" value='100' />
    </div>
  );
};