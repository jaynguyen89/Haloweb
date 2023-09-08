import { Theme } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    dimOverlay: {
        width: '100%',
        height: '100%',
        zIndex: 999,
        position: 'fixed',
        top: 0,
        left: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
    },
}));

const DimOverlay = () => {
    const styles = useStyles();
    return <div className={styles.dimOverlay} />;
};

export default DimOverlay;
