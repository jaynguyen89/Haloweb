import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Flasher from 'src/components/molecules/StatusIndicators/Flasher';
import useStyles from 'src/components/showcases/styles';

const FlasherShowcase = () => {
    const styles = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h5>Flasher variants</h5>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Standard)</Typography>
                <Flasher
                    message='This is an information Flasher.'
                    stage='showcase'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is an information Flasher.'
                            stage='showcase'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Filled)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    variant='filled'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a success Flasher.'
                            stage='showcase'
                            variant='filled'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (Outlined)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    variant='outlined'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a success Flasher.'
                            stage='showcase'
                            variant='outlined'
                        />`}
                    </code>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Standard)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a warning Flasher.'
                            stage='showcase'
                            severity='warning'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Filled)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                    variant='filled'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a warning Flasher.'
                            stage='showcase'
                            severity='warning'
                            variant='filled'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Warning (Outlined)</Typography>
                <Flasher
                    message='This is a warning Flasher.'
                    stage='showcase'
                    severity='warning'
                    variant='outlined'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a warning Flasher.'
                            stage='showcase'
                            severity='warning'
                            variant='outlined'
                        />`}
                    </code>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Standard)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is an error Flasher.'
                            stage='showcase'
                            severity='error'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Filled)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                    variant='filled'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is an error Flasher.'
                            stage='showcase'
                            severity='error'
                            variant='filled'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Error (Outlined)</Typography>
                <Flasher
                    message='This is an error Flasher.'
                    stage='showcase'
                    severity='error'
                    variant='outlined'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is an error Flasher.'
                            stage='showcase'
                            severity='error'
                            variant='outlined'
                        />`}
                    </code>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Standard)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a success Flasher.'
                            stage='showcase'
                            severity='success'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Filled)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                    variant='filled'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a success Flasher.'
                            stage='showcase'
                            severity='success'
                            variant='filled'
                        />`}
                    </code>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Success (Outlined)</Typography>
                <Flasher
                    message='This is a success Flasher.'
                    stage='showcase'
                    severity='success'
                    variant='outlined'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is a success Flasher.'
                            stage='showcase'
                            severity='success'
                            variant='outlined'
                        />`}
                    </code>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Typography variant='body1'>Information (horizontal)</Typography>
                <Flasher
                    message='This is an info Flasher.'
                    stage='showcase'
                    orientation='horizontal'
                />
                <Box className={styles.code}>
                    <code>
                        {`<Flasher
                            message='This is an info Flasher.'
                            stage='showcase'
                            orientation='horizontal'
                        />`}
                    </code>
                </Box>
            </Grid>
        </Grid>
    );
};

export default FlasherShowcase;
