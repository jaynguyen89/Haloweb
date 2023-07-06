import React from 'react';
import { Box } from '@mui/material';
import 'src/components/molecules/StatusInddicators/Loading/loading.scss';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div data-title='dot-falling'>
                <div className='stage'>
                    <div className='dot-falling' />
                </div>
            </div>
        </Box>
    );
};

export default Loading;
