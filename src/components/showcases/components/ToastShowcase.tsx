import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Toast from 'src/components/molecules/StatusIndicators/Toast';
import useStyles from 'src/components/showcases/styles';

const ToastShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Toasts</h5>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Default: see bottom right corner</Typography>
                <Toast stage='showcase' message={'This is a Toast.'} />
                <Box className={styles.code}>
                    <code>
                        {`<Toast stage='showcase' message={'This is a Toast.'} />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see bottom left corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='error'
                    position={{vertical: 'bottom', horizontal: 'left'}}
                />
                <Box className={styles.code}>
                    <code>
                        {`<Toast
                            stage='showcase'
                            message={'This is a Toast.'}
                            color='error'
                            position={{vertical: 'bottom', horizontal: 'left'}}
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see upper left corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='success'
                    position={{vertical: 'top', horizontal: 'left'}}
                />
                <Box className={styles.code}>
                    <code>
                        {`<Toast
                            stage='showcase'
                            message={'This is a Toast.'}
                            color='success'
                            position={{vertical: 'top', horizontal: 'left'}}
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='body1'>Custom: see upper right corner</Typography>
                <Toast
                    stage='showcase'
                    message={'This is a Toast.'}
                    color='warning'
                    position={{vertical: 'top', horizontal: 'right'}}
                />
                <Box className={styles.code}>
                    <code>
                        {`<Toast
                            stage='showcase'
                            message={'This is a Toast.'}
                            color='warning'
                            position={{vertical: 'top', horizontal: 'right'}}
                        />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ToastShowcase;
